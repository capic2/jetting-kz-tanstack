import type { Meta, StoryContext, StoryObj } from '@storybook/react-vite';
import type { ListBoxProps, SelectProps } from 'react-aria-components';

import { ListBox, Select } from 'react-aria-components';

import { SelectOption } from './SelectOption';
import { SelectOptionHelper } from './SelectOptionHelper';

interface SelectOptionContext extends StoryContext {
  parameters: {
    selectOption?: {
      items: ListBoxProps<{ id: number; name: string }>['items'];
      selectedKey: SelectProps['selectedKey'];
    };
  };
}

const meta: Meta<typeof SelectOption> = {
  title: 'Inputs/Select/SelectOption',
  component: SelectOption,
  subcomponents: {},
  decorators: [
    (Story, context: SelectOptionContext) => (
      <div className="w-[400px] bg-surface-neutral">
        <Select
          className="outline-none"
          selectedKey={context.parameters.selectOption?.selectedKey}
        >
          <ListBox
            className="outline-none"
            items={context.parameters.selectOption?.items}
          >
            <Story />
          </ListBox>
        </Select>
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
    a11y: { disable: true },
    links: {
      github:
        'https://github.com/PayFit/hr-apps/tree/master/packages/unity/components/src/components/form-field/parts/SelectOption.tsx',
    },
  },
  args: {
    children: 'Option 1',
    isDisabled: false,
  },
  tags: ['autodocs', 'dd-privacy:mask'],
};
export default meta;

type Story = StoryObj<typeof SelectOption>;

export const Default: Story = {};

export const Selected: Story = {
  parameters: {
    selectOption: {
      selectedKey: 'Watermelon',
      items: [
        { id: 'Apple', name: 'Apple' },
        { id: 'Banana', name: 'Banana' },
        { id: 'Orange', name: 'Orange' },
        { id: 'Honeydew', name: 'Honeydew' },
        { id: 'Grapes', name: 'Grapes' },
        { id: 'Watermelon', name: 'Watermelon' },
        { id: 'Cantaloupe', name: 'Cantaloupe' },
        { id: 'Pear', name: 'Pear' },
      ],
    },
  },
  args: {
    children: 'Watermelon',
    id: 'Watermelon',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Option 1',
    isDisabled: true,
  },
};

export const WithHelperText: Story = {
  args: {
    children: (
      <>
        Option 1<SelectOptionHelper>This is a helper text</SelectOptionHelper>
      </>
    ),
  },
};

export const WithHelperTextSelected: Story = {
  parameters: {
    selectOption: {
      selectedKey: 'Watermelon',
      items: [
        { id: 'Apple', name: 'Apple' },
        { id: 'Banana', name: 'Banana' },
        { id: 'Orange', name: 'Orange' },
        { id: 'Honeydew', name: 'Honeydew' },
        { id: 'Grapes', name: 'Grapes' },
        { id: 'Watermelon', name: 'Watermelon' },
        { id: 'Cantaloupe', name: 'Cantaloupe' },
        { id: 'Pear', name: 'Pear' },
      ],
    },
  },
  args: {
    children: (
      <>
        Watermelon<SelectOptionHelper>This is a helper text</SelectOptionHelper>
      </>
    ),
    id: 'Watermelon',
  },
};

export const WithHelperTextDisabled: Story = {
  parameters: {
    selectOption: {
      items: [
        { id: 'Apple', name: 'Apple' },
        { id: 'Banana', name: 'Banana' },
        { id: 'Orange', name: 'Orange' },
        { id: 'Honeydew', name: 'Honeydew' },
        { id: 'Grapes', name: 'Grapes' },
        { id: 'Watermelon', name: 'Watermelon' },
        { id: 'Cantaloupe', name: 'Cantaloupe' },
        { id: 'Pear', name: 'Pear' },
      ],
    },
  },
  args: {
    isDisabled: true,
    children: (
      <>
        Watermelon<SelectOptionHelper>This is a helper text</SelectOptionHelper>
      </>
    ),
    id: 'Watermelon',
  },
};
