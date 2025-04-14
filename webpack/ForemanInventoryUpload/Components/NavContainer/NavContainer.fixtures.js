import React from 'react';
import { noop } from 'foremanReact/common/helpers';
import { translate as __ } from 'foremanReact/common/I18n';

export const props = {
  items: [
    {
      icon: 'some-icon',
      name: __('Generating'),
      component: () => <p>test1</p>,
      onClick: noop,
    },
    {
      icon: 'other-icon',
      name: __('Uploading'),
      component: () => <p>test2</p>,
      onClick: noop,
    },
  ],
};
