module ForemanInventoryUpload
  module Async
    class QueueForUploadJob < ::Actions::EntryAction
      def plan(base_folder, report_file, organization_id, disconnected)
        enqueue_task = plan_self(base_folder: base_folder, report_file: report_file)
        plan_upload_report(enqueue_task.output[:enqueued_file_name], organization_id, disconnected)
      end

      def run
        logger.debug('Ensuring objects')
        ensure_ouput_folder
        ensure_output_script
        logger.debug("Copying #{report_file} to #{uploads_folder}")
        enqueued_file_name = File.join(uploads_folder, report_file)
        FileUtils.mv(File.join(base_folder, report_file), enqueued_file_name)
        logger.debug("Done copying #{report_file} to #{enqueued_file_name}")

        output[:enqueued_file_name] = enqueued_file_name
      end

      def uploads_folder
        @uploads_folder ||= ForemanInventoryUpload.uploads_folder
      end

      def script_file
        @script_file ||= File.join(uploads_folder, ForemanInventoryUpload.upload_script_file)
      end

      def ensure_ouput_folder
        FileUtils.mkdir_p(uploads_folder)
      end

      def ensure_output_script
        return if File.exist?(script_file)

        script_source = File.join(ForemanRhCloud::Engine.root, 'lib/foreman_inventory_upload/scripts/uploader.sh.erb')

        template_src = Foreman::Renderer::Source::String.new(content: File.read(script_source))
        scope = Foreman::Renderer::Scope::Base.new(
          source: template_src,
          variables: {
            upload_url: ForemanInventoryUpload.upload_url,
          }
        )
        script_source = Foreman::Renderer.render(template_src, scope)
        File.write(script_file, script_source)
        FileUtils.chmod('+x', script_file)
      end

      def logger
        Foreman::Logging.logger('background')
      end

      def base_folder
        input[:base_folder]
      end

      def report_file
        input[:report_file]
      end

      def plan_upload_report(enqueued_file_name, organization_id, disconnected)
        plan_action(UploadReportJob, enqueued_file_name, organization_id, disconnected)
      end
    end
  end
end
