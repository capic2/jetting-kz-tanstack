import { forwardRef, useState } from 'react';

import type { ForwardedRef, JSX, ReactNode } from 'react';
import type {
  PopoverProps as AriaPopoverProps,
  SelectProps as AriaSelectProps,
} from 'react-aria-components';

import {
  Select as AriaSelect,
  Autocomplete,
  ListBox,
  Popover,
  useFilter,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

import { SearchInput } from './parts/SearchInput';
import { SelectButton } from './parts/SelectButton';

const selectField = tv({
  slots: {
    base: 'flex flex-col gap-2 w-full',
    popover:
      'rounded-md border border-solid border-border-neutral w-[var(--trigger-width)] bg-surface-neutral',
    listbox: 'overflow-y-auto max-h-[296px] pt-2 pb-2 pl-2 pr-2',
  },
});

export interface SelectProps<T extends object>
  extends Omit<
    AriaSelectProps<T>,
    | 'children'
    | 'label'
    | 'style'
    | 'className'
    | 'selectedKey'
    | 'onSelectionChange'
  > {
  /** In static mode, contains <SelectOption /> and <SelectOptionGroup /> components, in dynamic mode, contains a function to render items passed to the component*/
  children: ReactNode | ((item: T) => ReactNode);
  /** In dynamic mode, contains the items to display in the select */
  items?: Iterable<T>;
  /** Whether the field is read-only */
  isReadOnly?: boolean;
  /** The value of the selected item */
  value?: AriaSelectProps<T>['selectedKey'];
  /** The default value of the selected item in uncontrolled mode */
  defaultValue?: AriaSelectProps<T>['defaultSelectedKey'];
  /** Function trigger when a item is selected */
  onChange?: AriaSelectProps<T>['onSelectionChange'];
  /** Whether the search input should be displayed or not */
  isSearchable?: boolean;
  /** The placement of the popover */
  placement?: Extract<AriaPopoverProps['placement'], 'top' | 'bottom'>;
}

const SelectImpl = <T extends object>(
  {
    children,
    items,
    placeholder,
    name,
    isDisabled,
    isInvalid,
    isReadOnly,
    value,
    defaultValue,
    onChange,
    isSearchable = false,
    onBlur,
    placement,
    ...rest
  }: SelectProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const [opened, setOpened] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { contains } = useFilter({ sensitivity: 'base' });
  const { base, popover, listbox } = selectField();

  const isControlled = value !== undefined || onChange !== undefined;
  const controlProps = isControlled
    ? {
        selectedKey: value,
        onSelectionChange: onChange,
      }
    : { defaultSelectedKey: defaultValue };

  return (
    <AriaSelect
      onOpenChange={setOpened}
      {...rest}
      ref={ref}
      className={base()}
      name={name}
      placeholder={isDisabled ? undefined : placeholder}
      isDisabled={isDisabled || isReadOnly}
      isInvalid={isInvalid}
      onBlur={onBlur}
      {...controlProps}
    >
      <SelectButton
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isReadOnly={isReadOnly}
        isOpen={opened}
      />

      <Popover
        offset={1}
        containerPadding={8}
        className={popover()}
        placement={placement}
      >
        {isSearchable ? (
          <Autocomplete filter={contains}>
            <SearchInput />
            <ListBox items={items} className={listbox()}>
              {children}
            </ListBox>
          </Autocomplete>
        ) : (
          <ListBox items={items} className={listbox()}>
            {children}
          </ListBox>
        )}
      </Popover>
    </AriaSelect>
  );
};

type SelectComponent = (<TItems extends object>(
  props: SelectProps<TItems> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

/**
 * The `Select` component is used to render a list of options
 * @example
 * ```tsx
 * const schema = z.object({
 *  vegetable: z.string()
 * })
 *
 * function MyForm() {
 *   const { Form, FormField } = useUnityForm(schema)
 *
 *   return (
 *    <Form action={handleSubmit}>
 *      <FormField name="vegetable">
 *        <FormLabel>Vegetables</FormLabel>
 *        <FormHelperText>Select your favorite vegetable</FormHelperText>
 *        <FormControl>
 *          <Select>
 *            <SelectOption id="Cabbage">Cabbage</SelectOption>
 *            <SelectOption id="Broccoli">Broccoli</SelectOption>
 *           <SelectOption id="Carrots">Carrots</SelectOption>
 *          </Select>
 *        </FormControl>
 *      </FormField>
 *    </Form>
 *   )
 * }
 * ```
 */
const Select = forwardRef(function UnitySelect<TItems extends object>(
  props: SelectProps<TItems>,
  ref: ForwardedRef<HTMLDivElement>
) {
  return SelectImpl<TItems>(props, ref);
}) as SelectComponent;

Select.displayName = 'Select';

export { Select };
