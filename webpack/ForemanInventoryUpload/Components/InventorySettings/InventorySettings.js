import React from 'react';
import { useSelector } from 'react-redux';
import { translate as __ } from 'foremanReact/common/I18n';

import AdvancedSetting from './AdvancedSetting';
import { settingsDict } from './AdvancedSetting/AdvancedSettingsConstants';
import { selectSubscriptionConnectionEnabled } from './InventorySettingsSelectors';

import './InventorySettings.scss';

const InventorySettings = () => {
  const subscriptionConnectionEnabled = useSelector(
    selectSubscriptionConnectionEnabled
  );
  const settingKeys = new Set(Object.keys(settingsDict));

  if (!subscriptionConnectionEnabled) {
    settingKeys.delete('autoUploadEnabled');
  }

  return (
    <div className="inventory-settings">
      <h3>{__('Settings')}</h3>
      {[...settingKeys].map(key => (
        <AdvancedSetting setting={key} key={key} />
      ))}
    </div>
  );
};

export default InventorySettings;
