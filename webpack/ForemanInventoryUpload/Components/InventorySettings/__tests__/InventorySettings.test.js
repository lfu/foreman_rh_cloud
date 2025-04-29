import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { screen, render } from '@testing-library/react';
import InventorySettings from '../InventorySettings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('InventorySettings', () => {
  test('when subscription connection is enabled', () => {
    const renderOptions = {
      API: {
        INVENTORY_SETTINGS: {
          response: { subscriptionConnectionEnabled: true },
        },
      },
    };
    const store = mockStore(renderOptions);

    render(
      <Provider store={store}>
        <InventorySettings />
      </Provider>
    );
    expect(screen.queryAllByText('Automatic inventory upload')).toHaveLength(2);
    expect(screen.queryAllByText('Obfuscate host names')).toHaveLength(2);
    expect(screen.queryAllByText('Obfuscate host ipv4 addresses')).toHaveLength(
      2
    );
    expect(screen.queryAllByText('Exclude installed Packages')).toHaveLength(2);
    expect(screen.queryAllByText('Automatic mismatch deletion')).toHaveLength(
      2
    );
  });

  test('when subscription connection is not enabled', () => {
    const renderOptions = {
      API: {
        INVENTORY_SETTINGS: {
          response: { subscriptionConnectionEnabled: false },
        },
      },
    };
    const store = mockStore(renderOptions);

    render(
      <Provider store={store}>
        <InventorySettings />
      </Provider>
    );

    expect(screen.queryAllByText('Automatic inventory upload')).toHaveLength(0);
    expect(screen.queryAllByText('Obfuscate host names')).toHaveLength(2);
    expect(screen.queryAllByText('Obfuscate host ipv4 addresses')).toHaveLength(
      2
    );
    expect(screen.queryAllByText('Exclude installed Packages')).toHaveLength(2);
    expect(screen.queryAllByText('Automatic mismatch deletion')).toHaveLength(
      2
    );
  });
});
