import type { Meta, StoryObj } from '@storybook/react-vite';

import { ListBox, Select } from 'react-aria-components';

import { SelectOption } from './SelectOption';
import { SelectOptionGroup } from './SelectOptionGroup';

const meta: Meta<typeof SelectOptionGroup> = {
  title: 'Inputs/Select/SelectOptionGroup',
  component: SelectOptionGroup,
  subcomponents: {},
  decorators: [
    (Story) => (
      <div className="w-[400px] bg-surface-neutral">
        <Select className="outline-none" aria-label="select">
          <ListBox className="outline-none">
            <Story />
          </ListBox>
        </Select>
      </div>
    ),
  ],
  parameters: {
    a11y: { disable: true },
  },
  args: {},
};
export default meta;

type Story = StoryObj<typeof SelectOptionGroup>;

export const Default: Story = {
  args: {
    children: (
      <>
        <SelectOptionGroup label="Group 1">
          <SelectOption id="1" textValue="option1">
            Option 1
          </SelectOption>
          <SelectOption id="2" textValue="option2">
            Option 2
          </SelectOption>
          <SelectOption id="3" textValue="option3">
            Option 3
          </SelectOption>
        </SelectOptionGroup>
        <SelectOption id="4" textValue="option4">
          Option 4
        </SelectOption>
        <SelectOption id="5" textValue="option5">
          Option 5
        </SelectOption>
      </>
    ),
  },
};

export const WithOnlyGroups: Story = {
  args: {
    children: (
      <>
        <SelectOptionGroup label="Group 1">
          <SelectOption id="1" textValue="option1">
            Option 1
          </SelectOption>
          <SelectOption id="2" textValue="option2">
            Option 2
          </SelectOption>
          <SelectOption id="3" textValue="option3">
            Option 3
          </SelectOption>
        </SelectOptionGroup>
        <SelectOptionGroup label="Group 2">
          <SelectOption id="4" textValue="option4">
            Option 4
          </SelectOption>
          <SelectOption id="5" textValue="option5">
            Option 5
          </SelectOption>
          <SelectOption id="6" textValue="option6">
            Option 6
          </SelectOption>
        </SelectOptionGroup>
      </>
    ),
  },
};

export const WithDynamicGroup: Story = {
  render: () => {
    const items = {
      name: 'Fruits',
      children: [
        { id: 'Apple', name: 'Apple' },
        { id: 'Banana', name: 'Banana' },
        { id: 'Orange', name: 'Orange' },
        { id: 'Honeydew', name: 'Honeydew' },
        { id: 'Grapes', name: 'Grapes' },
        { id: 'Watermelon', name: 'Watermelon' },
        { id: 'Cantaloupe', name: 'Cantaloupe' },
        { id: 'Pear', name: 'Pear' },
      ],
    };

    return (
      <SelectOptionGroup label={items.name} items={items.children}>
        {(item) => (
          <SelectOption id={item.id} textValue={item.id}>
            {item.name}
          </SelectOption>
        )}
      </SelectOptionGroup>
    );
  },
};
