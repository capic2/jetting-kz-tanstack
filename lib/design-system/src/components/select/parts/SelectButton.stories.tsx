import type { Meta, StoryObj } from '@storybook/react-vite';

import { Select } from 'react-aria-components';

import { SelectButton } from './SelectButton';

const meta: Meta<typeof SelectButton> = {
  title: 'Inputs/Select/SelectButton',
  component: SelectButton,
  subcomponents: {},
  decorators: [
    (Story) => (
      <Select>
        <Story />
      </Select>
    ),
  ],
  parameters: {
    a11y: { disable: true },
  },
  args: {},
};
export default meta;

type Story = StoryObj<typeof SelectButton>;

export const Default: Story = {};

export const Enabled: Story = {
  parameters: {
    pseudo: {
      enabled: true,
    },
  },
};

export const Active: Story = {
  parameters: {
    pseudo: {
      active: true,
    },
  },
};

export const Hover: Story = {
  parameters: {
    pseudo: {
      hover: true,
    },
  },
};

export const Focus: Story = {
  parameters: {
    pseudo: {
      focusVisible: true,
    },
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
};

export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
  },
};
