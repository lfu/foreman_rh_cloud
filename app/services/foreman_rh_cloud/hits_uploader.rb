module ForemanRhCloud
  class HitsUploader
    def initialize(host:, payload:, uuid: nil)
      @host = host
      @uuid = uuid
      @payload = payload
    end

    def upload!
      ActiveRecord::Base.transaction do
        update_facets
        update_hits
        update_rules_and_resolutions
        update_details
      end
    end

    private

    def update_facets
      facet = InsightsFacet.find_or_create_by(host_id: @host.id)
      facet.update!(uuid: @uuid) if @uuid.present?
      @host.reload
    end

    def update_hits
      facet = @host.insights
      facet.hits.delete_all
      hits = @payload[:hits]
      # rubocop:disable Rails/SkipsModelValidations
      facet.hits.insert_all(hits) if hits.present?
      # rubocop:enable Rails/SkipsModelValidations
      InsightsFacet.reset_counters(facet.id, :hits_count)
    end

    def update_rules_and_resolutions
      return if @payload[:rules].blank?
      # rubocop:disable Rails/SkipsModelValidations
      ::InsightsRule.upsert_all(@payload[:rules], unique_by: :rule_id)
      rules = @payload[:rules].map { |rule| rule[:rule_id] }

      return if @payload[:resolutions].blank?
      ::InsightsResolution.where(rule_id: rules).delete_all
      ::InsightsResolution.insert_all(@payload[:resolutions])
      # rubocop:enable Rails/SkipsModelValidations
    end

    def update_details
      return if @payload[:details].blank?
      fact_name = FactName.where(name: "insights::hit_details", short_name: 'insights_details').first_or_create
      fact_value = @host.fact_values.where(fact_name: fact_name).first_or_create
      fact_value.update(value: @payload[:details])
    end
  end
end
