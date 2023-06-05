import { Meta } from '@storybook/react';

import Switch from '@/components/switch/Switch';

export default {
  title: 'Components/Switch',
  component: Switch,
  argTypes: {
    onCheckedChange: { action: 'onCheckedChange' },
  },
} as Meta<typeof Switch>;

export const DefaultSM = {
  args: {
    label: 'Toggle',
  },
};

export const DefaultMd = {
  args: {
    label: 'Toggle',
    size: 'md',
  },
};

export const Disabled = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const DefaultOn = {
  args: {
    label: 'Toggle',
    defaultChecked: true,
  },
};