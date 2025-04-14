import React from 'react';
import { useSelector } from 'react-redux';
import SyncButton from '../SyncButton';
import CloudConnectorButton from '../CloudConnectorButton';
import './toolbarButtons.scss';
import { selectSubscriptionConnectionEnabled } from '../../../InventorySettings/InventorySettingsSelectors';

const ToolbarButtons = () => {
  const subscriptionConnectionEnabled = useSelector(
    selectSubscriptionConnectionEnabled
  );

  if (!subscriptionConnectionEnabled) {
    return null;
  }

  return (
    <div className="inventory_toolbar_buttons">
      <CloudConnectorButton />
      <SyncButton />
    </div>
  );
};

export default ToolbarButtons;
