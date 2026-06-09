import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import PageTitle from '../PageTitle';

let mockIopMode = false;

jest.mock('foremanReact/Root/Context/ForemanContext', () => ({
  useForemanContext: () => ({
    metadata: {
      foreman_rh_cloud: {
        iop: mockIopMode,
      },
    },
    UI: {},
  }),
}));

jest.mock('../components/CloudPingModal', () => () => (
  <div data-testid="cloud-ping-modal">CloudPingModal</div>
));

describe('PageTitle', () => {
  afterEach(() => {
    mockIopMode = false;
  });

  it('renders the page title', () => {
    render(<PageTitle />);
    expect(screen.getByText('Red Hat Inventory')).toBeTruthy();
  });

  it('renders the kebab dropdown', () => {
    render(<PageTitle />);
    expect(screen.getByLabelText('Actions')).toBeTruthy();
  });

  it('renders cloud-ping dropdown item when not in IoP mode', async () => {
    mockIopMode = false;
    render(<PageTitle />);
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Actions'));
    });
    expect(screen.getByText('Connectivity test')).toBeTruthy();
  });

  it('does not render cloud-ping dropdown item when in IoP mode', async () => {
    mockIopMode = true;
    render(<PageTitle />);
    await act(async () => {
      fireEvent.click(screen.getByLabelText('Actions'));
    });
    expect(screen.queryByText('Connectivity test')).toBeNull();
    mockIopMode = false;
  });
});
