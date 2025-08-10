import { forwardRef } from 'react';

import type { ForwardedRef, JSX, ReactNode } from 'react';

import type { LabelProps } from '../label/Label';
import type { SelectProps } from '../select/Select';

import { tv } from 'tailwind-variants';

import { FormFeedbackText } from '../form-field/parts/FormFeedbackText';
import { FormLabel } from '../form-field/parts/FormLabel';
import { Select } from '../select/Select';
import { useCustomFieldContext } from '../../hooks/customForm';

export interface SelectFieldProps<TItems extends object>
  extends Pick<LabelProps, 'isRequired' | 'requiredVariant'>,
    Omit<SelectProps<TItems>, 'name' | 'value'> {
  /** The name of the field, which should match the form schema. */
  name: string;
  /** The label for the select field. */
  label: string;
  /** Helper text to display below the text field. */
  helperText?: ReactNode;
  /** Feedback text to display below the text field. */
  feedbackText?: ReactNode;
}

const selectField = tv({
  base: 'uy-flex uy-flex-col uy-gap-2',
});

/**
 * Use the `selectField` component to create a list to select an option in a short list.
 * It is build with a schema-based approach, and will only work if it is a child of a [`formField` component](/?path=/docs/form-formfield--docs).
 *
 * The component is composed of `SelectOption` components to create the list of options.
 * A `helperText`property is available to add a text before the component to give more context.
 * A `feedbackText` property is available to add an error message to the component.
 */

const SelectFieldImpl = <TItems extends object>(
  {
    children,
    feedbackText,
    helperText,
    isRequired,
    label,
    name,
    requiredVariant,
    isDisabled,
    isInvalid,
    isReadOnly,
    placeholder,
    items,
    ...controlProps
  }: SelectFieldProps<TItems>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const field = useCustomFieldContext<string>();

  const commonProps = {
    isRequired,
    isInvalid,
    isDisabled,
    isReadOnly,
  };

  return (
    <div className={selectField()}>
      <FormLabel requiredVariant={requiredVariant}>{label}</FormLabel>
      {/*{helperText && <FormHelperText>{helperText}</FormHelperText>}*/}
      <Select
        ref={ref}
        name={name}
        placeholder={placeholder}
        items={items}
        onChange={(key) => field.handleChange(String(key))}
        onBlur={field.handleBlur}
        {...commonProps}
      >
        {children}
      </Select>
      <FormFeedbackText>{feedbackText}</FormFeedbackText>
    </div>
  );
};

type SelectFieldComponent = (<TItems extends object>(
  props: SelectFieldProps<TItems> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

/**
 * The `SelectField` component renders a list of options to select one, it is fully integrated with the `Form` component.
 * @example
 * ```tsx
 * const schema = z.object({
 *  vegetable: z.string()
 * })
 *
 * function MyForm() {
 *   const { Form } = useUnityForm(schema)
 *
 *   return (
 *    <Form action={handleSubmit}>
 *      <SelectField<typeof schema>
 *        name="vegetable"
 *        label="Vegetables"
 *        >
 *        <SelectOption id="Cabbage">Cabbage</SelectOption>
 *        <SelectOption id="Broccoli">Broccoli</SelectOption>
 *        <SelectOption id="Carrots">Carrots</SelectOption>
 *        </SelectField>
 *    </Form>
 *   )
 * }
 * ```
 * @note The schema type parameter is needed to ensure type safety with the form's schema. If you omit it, the `name` prop will not be type-safe.
 */
const SelectField = forwardRef(function UnitySelectField<TItems extends object>(
  props: SelectFieldProps<TItems>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return SelectFieldImpl<TItems>(props, ref);
}) as SelectFieldComponent;

export { SelectField };
