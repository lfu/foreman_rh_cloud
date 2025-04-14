import React from 'react';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { screen, render } from '@testing-library/react';
import { mount } from '@theforeman/test';
import NavContainer from '../NavContainer';
import { props } from '../NavContainer.fixtures';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('NavContainer', () => {
  const renderOptions = {
    API: {
      INVENTORY_SETTINGS: {
        response: { subscriptionConnectionEnabled: false },
      },
    },
  };

  test('click should call onTabClick prop', () => {
    const onTabClick = jest.fn();
    const modifiedProps = {
      ...props,
    };
    modifiedProps.items[0].onClick = onTabClick;
    const store = mockStore(renderOptions);

    const wrapper = mount(
      <Provider store={store}>
        <NavContainer {...modifiedProps} />
      </Provider>
    );
    wrapper.find('NavItem a').simulate('click');
    expect(onTabClick).toBeCalled();
  });

  test('when subscription connection is enabled', () => {
    const options = {
      API: {
        INVENTORY_SETTINGS: {
          response: { subscriptionConnectionEnabled: true },
        },
      },
    };
    const store = mockStore(options);
    render(
      <Provider store={store}>
        <NavContainer {...props} />
      </Provider>
    );

    expect(screen.queryAllByText('Generating')).toHaveLength(1);
    expect(screen.queryAllByText('Uploading')).toHaveLength(1);
  });

  test('when subscription connection is not enabled', () => {
    const store = mockStore(renderOptions);
    render(
      <Provider store={store}>
        <NavContainer {...props} />
      </Provider>
    );

    expect(screen.queryAllByText('Generating')).toHaveLength(1);
    expect(screen.queryAllByText('Uploading')).toHaveLength(0);
  });
});
