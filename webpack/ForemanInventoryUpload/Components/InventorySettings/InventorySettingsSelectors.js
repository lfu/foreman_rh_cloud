import { selectAPIResponse } from 'foremanReact/redux/API/APISelectors';
import { INVENTORY_SETTINGS } from './InventorySettingsConstants';

export const selectSettings = state =>
  selectAPIResponse(state, INVENTORY_SETTINGS);

export const selectAutoUploadEnabled = state =>
  selectSettings(state).autoUploadEnabled;

export const selectSubscriptionConnectionEnabled = state =>
  selectSettings(state).subscriptionConnectionEnabled;

export const selectHostObfuscationEnabled = state =>
  selectSettings(state).hostObfuscationEnabled;

export const selectIpsObfuscationEnabled = state =>
  selectSettings(state).ipsObfuscationEnabled;

export const selectExcludePackages = state =>
  selectSettings(state).excludePackagesEnabled;

export const selectMismatchDelete = state =>
  selectSettings(state).allowAutoInsightsMismatchDelete;
