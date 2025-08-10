import type { Meta, StoryContext, StoryObj } from '@storybook/react-vite';

import { expect, fn, within } from 'storybook/test';
import { z, ZodObject } from 'zod';

import { SelectOption } from '../select/parts/SelectOption';
import { SelectOptionGroup } from '../select/parts/SelectOptionGroup';
import { SelectOptionHelper } from '../select/parts/SelectOptionHelper';
import { SelectField } from './SelectField';
import { getTestingUtilsSelect } from './test-utils';
import { Form } from '../form/Form';
import { useCustomAppForm } from '../../hooks/customForm';

interface SelectFieldStoriesContext extends StoryContext {
  parameters: {
    value?: string;
    schema?: ZodObject;
  };
}

/**
 * The `SelectField` component fully integrates a [`Select`]() component with the [`Form`]() and [`FormField`]() component.
 *
 * You can build the list of options statically by using the `SelectOption` and `SelectOptionGroup` components; or dynamically by passing a function to the `children` prop, and use the `items` property to populate the list of options.
 *
 * > **Note:** This component can only be used within a `Form` component returned from the `useUnityForm` hook.
 */
const meta: Meta<typeof SelectField> = {
  title: 'form/SelectField',
  component: SelectField,
  subcomponents: {},
  decorators: [
    function UnityFormDecorator(Story, context: SelectFieldStoriesContext) {
      const schema =
        context.parameters.schema ??
        z.object({
          test: z.string({ message: 'This field is required' }),
        });

      const form = useCustomAppForm({
        defaultValues: context.parameters.value
          ? {
              test: context.parameters.value,
            }
          : {},
        validators: {
          onBlur: schema,
        },
      });

      return (
        <Form schema={schema} onSubmit={fn()} className="uy-w-[25vmax]">
          <form.AppField name="test" children={() => <Story />} />
        </Form>
      );
    },
  ],
  parameters: {
    layout: 'centered',
    links: {
      github:
        'https://github.com/PayFit/hr-apps/tree/master/packages/unity/components/src/components/select-field',
      figma:
        'https://www.figma.com/design/poaMyU7abAgL9VRhx4ygyy/Unity-DS-%3E-Components-Library?node-id=513-2172',
      zeroheight: 'https://www.payfit.design/24f360409/p/32e02a-select',
    },
    enhancedDocs: {
      zodSchema: `
z.object({
  test: z.string({ message: 'This field is required' }),
})`,
    },
    testHelpers: [
      {
        name: 'selectOption',
        description:
          'Use the `selectOption` to select an option in a select field, it uses the label of the field to find the select field, and takes the option name as the second argument.',
        usages: [
          `
play: async context => {
  const { selectOption } = getTestingUtilsSelect(context)
  const canvas = within(context.canvasElement)
  await selectOption({ labelText: 'Select your favorite fruit', optionName: 'Watermelon' })
}
        `,
          `
play: async context => {
  const { selectOption } = getTestingUtilsSelect(context)
  const canvas = within(context.canvasElement)
  await selectOption({ labelText: globalIntl.formatMessage({ id: 'selectfield:label' }), optionName: 'Watermelon' })
}
        `,
        ],
      },
    ],
  },
  tags: ['autodocs', 'dd-privacy:mask'],
};
export default meta;

type Story = StoryObj<typeof SelectField>;

export const Default: Story = {
  args: {
    label: 'Select your favorite fruit',
    name: 'test',
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
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * The `SelectField` component renders a list of `SelectOption` to select one.
 */
export const Primary: Story = {
  args: {
    label: 'Select your favorite fruit',
    name: 'test',
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
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * The `SelectField` component can have a default value, which will be selected when the component is rendered.
 * The default value can be set using the `defaultValue` prop in the `useUnityForm` hook.
 */
export const WithDefaultValue: Story = {
  args: {
    label: 'Select your favorite fruit',
    name: 'test',
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
  parameters: {
    value: 'Banana',
  },
};

export const WithHelperText: Story = {
  args: {
    label: 'Select your favorite fruit',
    name: 'test',
    helperText: 'By reading me, you will better understand what I am about',
    children: (
      <>
        <SelectOption id="Apple">Apple</SelectOption>
        <SelectOption id="Banana">Banana</SelectOption>
      </>
    ),
  },
};

/**
 * The `SelectField` component can be used to render groups of options. The `SelectOptionGroup` component is used to define the group, and it contains `SelectOption` components.
 */
export const WithGroups: Story = {
  args: {
    label: 'Select a fruit or a vegetable',
    name: 'test',
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
        </SelectOptionGroup>
      </>
    ),
  },
  parameters: {
    chromatic: { disableSnapshot: true },
  },
};

/**
 * The `SelectField` component displays a placeholder when no value is selected, you can customize this placeholder using the `placeholder` prop.
 */
export const WithCustomPlaceholder: Story = {
  args: {
    label: 'Select a vegetable',
    name: 'test',
    placeholder: 'Choose a vegetable',
    children: (
      <>
        <SelectOption id="Cabbage">Cabbage</SelectOption>
        <SelectOption id="Broccoli">Broccoli</SelectOption>
        <SelectOption id="Carrots">Carrots</SelectOption>
        <SelectOption id="Lettuce">Lettuce</SelectOption>
        <SelectOption id="Spinach">Spinach</SelectOption>
        <SelectOption id="Bok Choy">Bok Choy</SelectOption>
      </>
    ),
  },
};

/**
 * The `SelectField` component can have disabled `SelectOption`
 */
export const WithDisabledOptions: Story = {
  args: {
    label: 'Select your favorite fruit',
    name: 'test',
    children: (
      <>
        <SelectOption id="Apple" isDisabled={true}>
          Apple
        </SelectOption>
        <SelectOption id="Banana">Banana</SelectOption>
        <SelectOption id="Orange">Orange</SelectOption>
        <SelectOption id="Honeydew">Honeydew</SelectOption>
        <SelectOption id="Grapes" isDisabled={true}>
          Grapes
        </SelectOption>
        <SelectOption id="Watermelon">Watermelon</SelectOption>
        <SelectOption id="Cantaloupe" isDisabled={true}>
          Cantaloupe
        </SelectOption>
        <SelectOption id="Pear">Pear</SelectOption>
      </>
    ),
  },
};

/**
 * The `SelectField` component can be built dynamically by passing a function to the `children` prop, and use the `items` property to populate the list of options.
 */
export const WithDynamicItems: Story = {
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
      <SelectField label="Select field" name="test" items={items}>
        {(item) => <SelectOption id={item.id}>{item.name}</SelectOption>}
      </SelectField>
    );
  },
};

/**
 * The dynamic api can be used to build groups of options dynamically.
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
      <SelectField label="Select field" name="test" items={items}>
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
      </SelectField>
    );
  },
};

/**
 * You can use the dynamic items with helper text, by providing a property for the helper text.
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
      <SelectField label="Select field" name="test" items={items}>
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
      </SelectField>
    );
  },
};

/**
 * The `SelectField` component also supports a search filter under its options with the `isSearchable` prop. Use this to add a search input at the top of the select options popover, and optionally display it based on the number of items in the select.
 */
export const WithSearch: Story = {
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
      <SelectField
        label="Select field"
        name="test"
        items={items}
        isSearchable={true}
      >
        <SelectOption textValue="apple">Apple</SelectOption>
        <SelectOption textValue="banana">Banana</SelectOption>
        <SelectOption textValue="orange">Orange</SelectOption>
        <SelectOption textValue="honeydew">Honeydew</SelectOption>
        <SelectOption textValue="grapes">Grapes</SelectOption>
        <SelectOption textValue="watermelon">Watermelon</SelectOption>
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
      </SelectField>
    );
  },
};

/**
 * The `SelectField` component can be marked as optional using the `isRequired` prop, and can be displayed in a 2 ways, as requered or optional, using the `requiredVariant` prop.
 */
export const Optional: Story = {
  args: {
    label: 'Select your favorite fruit',
    name: 'test',
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
    isRequired: false,
    requiredVariant: 'optional',
  },
};

/**
 * The `SelectField` component can be marked as invalid using the `isInvalid` prop.
 */
export const Invalid: Story = {
  args: {
    label: 'Select your favorite fruit',
    name: 'test',
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
  parameters: {
    schema: z.object({
      test: z
        .string()
        .refine((value) => value !== 'Watermelon', 'Watermelon is not allowed'),
    }),
    enhancedDocs: {
      zodSchema: `
z.object({
  test: z
    .string()
    .refine(value => value !== 'Watermelon', 'Watermelon is not allowed'),
})`,
    },
  },
  play: async (context) => {
    const { selectOption } = getTestingUtilsSelect(context);
    const canvas = within(context.canvasElement);
    await selectOption({
      labelText: 'Select your favorite fruit',
      optionName: 'Watermelon',
    });

    await expect(
      await canvas.findByText('Watermelon is not allowed')
    ).toBeInTheDocument();
  },
};

/**
 * The `SelectField` component can be marked as read-only using the `isReadOnly` prop.
 */
export const ReadOnly: Story = {
  parameters: {
    value: 'Apple',
  },
  args: {
    isReadOnly: true,
    label: 'Select your favorite fruit',
    name: 'test',
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
};

/**
 * The `SelectField` component can be marked as disabled using the `isDisabled` prop.
 */
export const Disabled: Story = {
  parameters: {
    value: 'Apple',
  },
  args: {
    isDisabled: true,
    label: 'Select your favorite fruit',
    name: 'test',
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
};
