import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { screen, render } from '@testing-library/react';
import ToolbarButtons from '../ToolbarButtons';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const renderOptions = {
  API: {
    INVENTORY_SETTINGS: {
      response: { subscriptionConnectionEnabled: true },
    },
  },
  ForemanRhCloud: {
    inventoryUpload: {
      accountsList: {
        CloudConnectorStatus: {},
      },
    },
  },
};

describe('ToolbarButtons', () => {
  test('when subscription connection is enabled', () => {
    const store = mockStore(renderOptions);

    render(
      <Provider store={store}>
        <ToolbarButtons />
      </Provider>
    );
    expect(screen.queryAllByText('Configure cloud connector')).toHaveLength(1);
    expect(screen.queryAllByText('Sync all inventory status')).toHaveLength(1);
  });

  test('when subscription connection is not enabled', () => {
    const localSetting = {
      API: {
        INVENTORY_SETTINGS: {
          response: { subscriptionConnectionEnabled: false },
        },
      },
    };
    const store = mockStore({
      ...renderOptions,
      ...localSetting,
    });

    render(
      <Provider store={store}>
        <ToolbarButtons />
      </Provider>
    );
    expect(screen.queryAllByText('Configure cloud connector')).toHaveLength(0);
    expect(screen.queryAllByText('Sync all inventory status')).toHaveLength(0);
  });
});
