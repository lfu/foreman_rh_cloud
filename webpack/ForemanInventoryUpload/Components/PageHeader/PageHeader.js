import React from 'react';
import { Grid, GridItem } from '@patternfly/react-core';
import InventorySettings from '../InventorySettings';
import PageDescription from './components/PageDescription';
import InventoryFilter from '../InventoryFilter';
import ToolbarButtons from './components/ToolbarButtons';
import SettingsWarning from './components/SettingsWarning';
import PageTitle from './PageTitle';
import { useIopConfig } from '../../../common/Hooks/ConfigHooks';
import './PageHeader.scss';

const PageHeader = () => {
  const isIop = useIopConfig();

  return (
    <div className="inventory-upload-header">
      <SettingsWarning />
      <PageTitle />
      {!isIop && (
        <div className="inventory-upload-header-description">
          <InventorySettings />
          <PageDescription />
        </div>
      )}
      <Grid>
        <GridItem span={4}>
          <InventoryFilter />
        </GridItem>
        <GridItem span={7} offset={1}>
          <ToolbarButtons />
        </GridItem>
      </Grid>
    </div>
  );
};

PageHeader.propTypes = {};

PageHeader.defaultProps = {};

export default PageHeader;
