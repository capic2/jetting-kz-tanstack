//import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, screen, userEvent, within } from 'storybook/test';
//import { z } from 'zod'

/*import { globalIntl } from '../../../.storybook/decorators'
import { useUnityForm } from '../../hooks/use-form'
import { Avatar } from '../avatar/Avatar'
import { AvatarFallback } from '../avatar/parts/AvatarFallback'
import { AvatarImage } from '../avatar/parts/AvatarImage'
import { Flex } from '../flex/Flex'
import { FormControl } from '../form-field/parts/FormControl'*/
/*import { FormHelperText } from '../form-field/parts/FormHelperText'
import { FormLabel } from '../form-field/parts/FormLabel'
import { Text } from '../text/Text'*/
import { SelectOption } from './parts/SelectOption';
import { SelectOptionGroup } from './parts/SelectOptionGroup';
import { SelectOptionHelper } from './parts/SelectOptionHelper';
import { Select } from './Select';

/**
 * The `Select` component renders a list of options to select one.
 *
 * You can build the list of options statically by using the `SelectOption` and `SelectOptionGroup` components.
 *
 * It can also be built dynamically by passing a function to the `children` prop, and use the `items` property to populate the list of options.
 */
const meta: Meta<typeof Select> = {
  title: 'Inputs/Select',
  component: Select,
  subcomponents: {
    SelectOption,

    SelectOptionGroup,

    SelectOptionHelper,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: 'centered',
  },
  args: {
    value: 'Watermelon',
    children: (
      <>
        <SelectOption id="Apple">Apple</SelectOption>
        <SelectOption id="Banana">Banana</SelectOption>
        <SelectOption id="Orange">Orange</SelectOption>
        <SelectOption id="Honeydew">Honeydew</SelectOption>
        <SelectOption id="Grapes">Grapes</SelectOption>
        <SelectOption id="Watermelon">Watermelon</SelectOption>
        <SelectOption id="Cantaloupe">Cantaloupe</SelectOption>
        <SelectOption id="Pear">Pear</SelectOption>
      </>
    ),
  },
  tags: ['autodocs', 'dd-privacy:mask'],
};
export default meta;

type Story = StoryObj<typeof Select>;

export const Default: Story = {};

/**
 * The `Select` component is used to render a list of options
 */
export const Primary: Story = {};

export const Uncontrolled: Story = {
  args: {
    defaultValue: 'Banana',
  },
};

/**
 * By default, the `Select` component displays a placeholder when no value is selected.
 * You can customize the placeholder text using the `placeholder` prop.
 */
export const Placeholder: Story = {
  args: {
    placeholder: 'Choose a vegetable',
    value: null,
  },
};

/**
 * You can add a helper text to an option using the `SelectOptionHelper` component.
 */
export const OptionWithHelper: Story = {
  args: {
    children: (
      <>
        <SelectOption id="Apple">
          Apple
          <SelectOptionHelper>This is a helper text</SelectOptionHelper>
        </SelectOption>
        <SelectOption id="Banana">Banana</SelectOption>
        <SelectOption id="Orange">Orange</SelectOption>
      </>
    ),
  },
};

/**
 * The options can be grouped using the `SelectOptionGroup` component. You must provide a `label` to this component, which will serve as the group's title.
 */
export const WithGroups: Story = {
  args: {
    children: (
      <>
        <SelectOptionGroup label="Fruits">
          <SelectOption id="Apple">Apple</SelectOption>
          <SelectOption id="Banana">Banana</SelectOption>
          <SelectOption id="Orange">Orange</SelectOption>
          <SelectOption id="Honeydew">Honeydew</SelectOption>
          <SelectOption id="Grapes">Grapes</SelectOption>
          <SelectOption id="Watermelon">Watermelon</SelectOption>
          <SelectOption id="Cantaloupe">Cantaloupe</SelectOption>
          <SelectOption id="Pear">Pear</SelectOption>
        </SelectOptionGroup>
        <SelectOptionGroup label="Vegetables">
          <SelectOption id="Cabbage">Cabbage</SelectOption>
          <SelectOption id="Broccoli">Broccoli</SelectOption>
          <SelectOption id="Carrots">Carrots</SelectOption>
          <SelectOption id="Lettuce">Lettuce</SelectOption>
          <SelectOption id="Spinach">Spinach</SelectOption>
          <SelectOption id="Bok Choy">Bok Choy</SelectOption>
          <SelectOption id="Cauliflower">Cauliflower</SelectOption>
          <SelectOption id="Potatoes">Potatoes</SelectOption>
        </SelectOptionGroup>
        <SelectOptionGroup label="Other">
          <SelectOption id="Other1">Other1</SelectOption>
          <SelectOption id="Other2">Other2</SelectOption>
          <SelectOption id="Other3">Other3</SelectOption>
          <SelectOption id="Other4">Other4</SelectOption>
          <SelectOption id="Other5">Other5</SelectOption>
          <SelectOption id="Other6">Other6</SelectOption>
          <SelectOption id="Other7">Other7</SelectOption>
          <SelectOption id="Other8">Other8</SelectOption>
          <SelectOption id="Other9">Other9</SelectOption>
          <SelectOption id="Other10">Other10</SelectOption>
          <SelectOption id="Other11">Other11</SelectOption>
        </SelectOptionGroup>
      </>
    ),
  },
};

/**
 * You can add a search input to the select options using the `isSearchable` prop. Use this particularly with the dynamic API, when you have a large number of options (at least more than 7).
 */
export const WithSearch: Story = {
  args: {
    children: (
      <>
        <SelectOption textValue="apple">Apple</SelectOption>
        <SelectOption textValue="banana">Banana</SelectOption>
        <SelectOption textValue="orange">Orange</SelectOption>
        <SelectOption textValue="honeydew">Honeydew</SelectOption>
        <SelectOption textValue="grapes">Grapes</SelectOption>
        <SelectOption textValue="watermelon">
          Watermelon
          <SelectOptionHelper>This is a helper text</SelectOptionHelper>
        </SelectOption>
        <SelectOption textValue="cantaloupe">Cantaloupe</SelectOption>
        <SelectOption textValue="pear">Pear</SelectOption>
        <SelectOption textValue="cabbage">Cabbage</SelectOption>
        <SelectOption textValue="broccoli">Broccoli</SelectOption>
        <SelectOption textValue="carrots">Carrots</SelectOption>
        <SelectOption textValue="lettuce">Lettuce</SelectOption>
        <SelectOption textValue="spinach">Spinach</SelectOption>
        <SelectOption textValue="bok choy">Bok Choy</SelectOption>
        <SelectOption textValue="cauliflower">Cauliflower</SelectOption>
        <SelectOption textValue="potatoes">Potatoes</SelectOption>
        <SelectOption textValue="other">Other</SelectOption>
        <SelectOption textValue="other1">Other1</SelectOption>
      </>
    ),
    isSearchable: true,
  },
};

/**
 * The `Select` component can be marked as invalid using the `isInvalid` prop.
 */
export const Invalid: Story = {
  args: {
    isInvalid: true,
  },
};

/**
 * The `Select` component can be marked as read-only using the `isReadOnly` prop.
 */
export const ReadOnly: Story = {
  args: {
    isReadOnly: true,
  },
};

/**
 * The `Select` component can be marked as disabled using the `isDisabled` prop.
 */
export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
};

/** You can use the `placement` prop to change the placement of the popover */
export const WithPlacement: Story = {
  args: {
    placement: 'top',
  },
};

/**
 * You can use the `items` prop to pass an array of items to the `Select` component.
 * Each item should be an object with a property which can be used as the final value the option represents and a property which can be used as a label.
 * The `children` prop will be used to render the items by using a render function
 */
export const WithDynamicSimpleItems: Story = {
  render: () => {
    const items = [
      { id: 'Apple', name: 'Apple' },
      { id: 'Banana', name: 'Banana' },
      { id: 'Orange', name: 'Orange' },
      { id: 'Honeydew', name: 'Honeydew' },
      { id: 'Grapes', name: 'Grapes' },
      { id: 'Watermelon', name: 'Watermelon' },
      { id: 'Cantaloupe', name: 'Cantaloupe' },
      { id: 'Pear', name: 'Pear' },
    ];
    return (
      <Select items={items}>
        {(item) => <SelectOption id={item.id}>{item.name}</SelectOption>}
      </Select>
    );
  },
};

/**
 * You can use groups with the dynamic API as well. Each item should be an object with a property for the group's name and a property for the list of options within the group.
 * Each child item should be an object with a property which can be used as the final value the option represents and a property which can be used as a label.
 * ```
 * interface Option {
 *   id: string
 *   name: string
 *   description?: string
 * }
 * interface OptionGroup {
 *   name: string
 *   children: Option[]
 * }
 * ```
 *
 * > note: these interfaces are just a reference. The component does enforce a specific data contract.
 */
export const WithDynamicGroupItems: Story = {
  render: () => {
    const items = [
      {
        name: 'Fruit',
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
      },
      {
        name: 'Vegetables',
        children: [
          { id: 'Cabbage', name: 'Cabbage' },
          { id: 'Broccoli', name: 'Broccoli' },
          { id: 'Carrots', name: 'Carrots' },
          { id: 'Lettuce', name: 'Lettuce' },
          { id: 'Spinach', name: 'Spinach' },
          { id: 'Bok Choy', name: 'Bok Choy' },
          { id: 'Cauliflower', name: 'Cauliflower' },
          { id: 'Potatoes', name: 'Potatoes' },
        ],
      },
      { id: 'Other', name: 'Other' },
      { id: 'Other1', name: 'Other1' },
    ];

    return (
      <Select items={items}>
        {(section) =>
          'children' in section ? (
            <SelectOptionGroup
              id={section.name}
              label={section.name}
              items={section.children}
            >
              {(item) => <SelectOption id={item.id}>{item.name}</SelectOption>}
            </SelectOptionGroup>
          ) : (
            <SelectOption id={section.id}>{section.name}</SelectOption>
          )
        }
      </Select>
    );
  },
};

/**
 * The dynamic items can be used with items helper text.
 * Each item should be an object with a property for the name of the group and a property for the list of options in the group.
 * Each child item should be an object with a property which can be used as the final value the option represents, a property which can be used as a label, and an optional property for the helper text.
 */
export const WithDynamicItemsAndHelperText: Story = {
  render: () => {
    const items = [
      {
        name: 'Fruit',
        children: [
          { id: 'Apple', name: 'Apple' },
          { id: 'Banana', name: 'Banana' },
          { id: 'Orange', name: 'Orange' },
          { id: 'Honeydew', name: 'Honeydew' },
          { id: 'Grapes', name: 'Grapes' },
          {
            id: 'Watermelon',
            name: 'Watermelon',
            helperText: 'Watermelon helper text',
          },
          { id: 'Cantaloupe', name: 'Cantaloupe' },
          { id: 'Pear', name: 'Pear' },
        ],
      },
      {
        name: 'Vegetables',
        children: [
          { id: 'Cabbage', name: 'Cabbage', helperText: 'Cabbage helper text' },
          { id: 'Broccoli', name: 'Broccoli' },
          { id: 'Carrots', name: 'Carrots' },
          { id: 'Lettuce', name: 'Lettuce' },
          { id: 'Spinach', name: 'Spinach' },
          { id: 'Bok Choy', name: 'Bok Choy' },
          { id: 'Cauliflower', name: 'Cauliflower' },
          { id: 'Potatoes', name: 'Potatoes' },
        ],
      },
      { id: 'Other', name: 'Other', helperText: 'Other helper text' },
      { id: 'Other1', name: 'Other1' },
    ];

    return (
      <Select items={items}>
        {(section) =>
          'children' in section ? (
            <SelectOptionGroup
              id={section.name}
              label={section.name}
              items={section.children}
            >
              {(item) => (
                <SelectOption id={item.id}>
                  {item.name}
                  {item.helperText ? (
                    <SelectOptionHelper>{item.helperText}</SelectOptionHelper>
                  ) : null}
                </SelectOption>
              )}
            </SelectOptionGroup>
          ) : (
            <SelectOption id={section.id}>
              {section.name}
              {section.helperText ? (
                <SelectOptionHelper>{section.helperText}</SelectOptionHelper>
              ) : null}
            </SelectOption>
          )
        }
      </Select>
    );
  },
};

/**
 * Example of how to use the `onChange` function with an number as `id`a select with number as key
 * The `onChange` function takes as parameters an key of type `Key` (number or string), to be able to pass the `id` as a number to another function, you can take this example as a reference
 * Of course, you can do it with other kind of type check.
 */
/*export const WithNumberAsKey: Story = {
  parameters: {
    docs: {
      source: {
        type: 'code',
      },
    },
  },
  render: function Render({ ...args }) {
    const [value, setValue] = useState<number | null>(null)
    const items = [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
      { id: 3, name: 'Option 3' },
      { id: 4, name: 'Option 4' },
    ]
    return (
      <Flex direction="col">
        <Select
          {...args}
          items={items}
          value={value}
          onChange={key => {
            const numericKey = Number(key)
            if (!isNaN(numericKey)) {
              setValue(numericKey)
            }
          }}
        >
          {item => <SelectOption id={item.id}>{item.name}</SelectOption>}
        </Select>
        <Text variant="bodySmallStrong">Selected id: {value}</Text>
      </Flex>
    )
  },
}*/

/**
 * The `Select` component can be used within a form using the `Form` component.
 * You can use all the components available for `FormField` but it is recommended to use the dedicated component: `SelectField`, everything is already configured for you.
 */
/*export const WithinForm: Story = {
  args: {
    children: (
      <>
        <SelectOption id="Apple">Apple</SelectOption>
        <SelectOption id="Banana">Banana</SelectOption>
        <SelectOption id="Orange">Orange</SelectOption>
        <SelectOption id="Honeydew">Honeydew</SelectOption>
        <SelectOption id="Grapes">Grapes</SelectOption>
        <SelectOption id="Watermelon">Watermelon</SelectOption>
        <SelectOption id="Cantaloupe">Cantaloupe</SelectOption>
        <SelectOption id="Pear">Pear</SelectOption>
      </>
    ),
    value: 'Watermelon',
  },
  parameters: {
    enhancedDocs: {
      zodSchema: `
z.object({
  test: z.string(),
})`,
    },
  },
  render: function Render({ value, ...args }) {
    const schema = z.object({
      test: z.string(),
    })
    const { Form, FormField } = useUnityForm(schema, {
      mode: 'onBlur',
      defaultValues: {
        test: value as string,
      },
    })

    return (
      <Form action={fn()}>
        <FormField name="test">
          <FormLabel>My Select</FormLabel>
          <FormHelperText>Enter your long text here</FormHelperText>
          <FormControl>
            <Select {...args} />
          </FormControl>
        </FormField>
      </Form>
    )
  },
}*/

/**
 * When using complex content in SelectOption (like components instead of simple text),
 * you must provide the `textValue` prop to enable search functionality.
 * This allows the search to match against the text value rather than the complex content.
 */
/*export const CollaboratorSwitcherExample: Story = {
  args: {
    isSearchable: true,
    children: (
      <>
        <SelectOption id="john smith" textValue="john smith">
          <Flex gap="100">
            <Avatar aria-label="John Smith" size="md" variant="circle">
              <AvatarImage src="/images/avatar-1.jpg" alt="Avatar" />
              <AvatarFallback variant="initials">JS</AvatarFallback>
            </Avatar>
            John Smith
          </Flex>
        </SelectOption>
        <SelectOption id="sarah johnson" textValue="sarah johnson">
          <Flex gap="100">
            <Avatar aria-label="Sarah Johnson" size="md" variant="circle">
              <AvatarImage src="/images/avatar-2.jpg" alt="Avatar" />
              <AvatarFallback variant="initials">SJ</AvatarFallback>
            </Avatar>
            Sarah Johnson
          </Flex>
        </SelectOption>
        <SelectOption id="maria perez" textValue="maria perez">
          <Flex gap="100">
            <Avatar aria-label="Maria Perez" size="md" variant="circle">
              <AvatarImage src="/images/avatar-3.jpg" alt="Avatar" />
              <AvatarFallback variant="initials">MP</AvatarFallback>
            </Avatar>
            Maria Perez
          </Flex>
        </SelectOption>
      </>
    ),
  },
}*/

/**
 * This example shows how to use `textValue` with dynamic items.
 * When rendering complex content in SelectOption, the `textValue` prop is essential
 * for the search functionality to work properly.
 */
/*export const CollaboratorSwitcherDynamicExample: Story = {
  args: {
    isSearchable: true,
  },
  render: ({ ...args }) => {
    const list = [
      {
        id: 'john smith',
        name: 'john smith',
        avatar: '/images/avatar-1.jpg',
        initials: 'JS',
      },
      {
        id: 'sarah johnson',
        name: 'sarah johnson',
        avatar: '/images/avatar-2.jpg',
        initials: 'SJ',
      },
      {
        id: 'maria perez',
        name: 'maria perez',
        avatar: '/images/avatar-3.jpg',
        initials: 'MP',
      },
    ]
    return (
      <Select {...args} items={list}>
        {item => (
          <SelectOption id={item.id} textValue={item.id}>
            <Flex gap="100">
              <Avatar aria-label={item.name} size="md" variant="circle">
                <AvatarImage src={item.avatar} alt="Avatar" />
                <AvatarFallback variant="initials">
                  {item.initials}
                </AvatarFallback>
              </Avatar>
              {item.name}
            </Flex>
          </SelectOption>
        )}
      </Select>
    )
  },
}*/

export const SearchTest: Story = {
  name: '[Test] It is possible to search for an option',
  args: {
    children: (
      <>
        <SelectOption id="Apple" textValue="apple">
          Apple
        </SelectOption>
        <SelectOption id="Banana" textValue="banana">
          Banana
        </SelectOption>
        <SelectOption id="Orange" textValue="orange">
          Orange
        </SelectOption>
        <SelectOption id="Honeydew" textValue="honeydew">
          Honeydew
        </SelectOption>
        <SelectOption id="Grapes" textValue="grapes">
          Grapes
        </SelectOption>
        <SelectOption id="Watermelon" textValue="watermelon">
          Watermelon
        </SelectOption>
        <SelectOption id="Cantaloupe" textValue="cantaloupe">
          Cantaloupe
        </SelectOption>
        <SelectOption id="Pear" textValue="pear">
          Pear
        </SelectOption>
        <SelectOption id="Cabbage" textValue="cabbage">
          Cabbage
        </SelectOption>
        <SelectOption id="Broccoli" textValue="broccoli">
          Broccoli
        </SelectOption>
        <SelectOption id="Carrots" textValue="carrots">
          Carrots
        </SelectOption>
        <SelectOption id="Lettuce" textValue="lettuce">
          Lettuce
        </SelectOption>
        <SelectOption id="Spinach" textValue="spinach">
          Spinach
        </SelectOption>
        <SelectOption id="Bok Choy" textValue="bok choy">
          Bok Choy
        </SelectOption>
        <SelectOption id="Cauliflower" textValue="cauliflower">
          Cauliflower
        </SelectOption>
        <SelectOption id="Potatoes" textValue="potatoes">
          Potatoes
        </SelectOption>
        <SelectOption id="Other" textValue="other">
          Other
        </SelectOption>
        <SelectOption id="Other1" textValue="other1">
          Other1
        </SelectOption>
      </>
    ),
    isSearchable: true,
  },
  parameters: {
    chromatic: { disableSnapshot: true },
    docs: { codePanel: false },
  },
  tags: ['!autodocs'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('button'));
    await userEvent.type(screen.getByRole('searchbox'), 'Water');

    await expect(screen.getAllByRole('listbox')).toHaveLength(1);
    await expect(
      screen.getByRole('option', { name: 'Watermelon' })
    ).toBeInTheDocument();
  },
};
/*

export const ClearSearchTest: Story = {
  name: '[Test] It clears the search when the clear button is clicked',
  parameters: {
    chromatic: { disableSnapshot: true },
  },
  args: {
    isSearchable: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    await userEvent.click(canvas.getByRole('button'))
    await userEvent.type(screen.getByRole('searchbox'), 'Water')

    await userEvent.click(
      screen.getByRole('button', {
        name: globalIntl.formatMessage({
          id: 'unity:component:common:clear:title',
        }),
      }),
    )

    await expect(screen.getByRole('searchbox')).toHaveValue('')
  },
}
*/
