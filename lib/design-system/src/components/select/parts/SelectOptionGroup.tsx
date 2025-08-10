import { forwardRef } from 'react';

import type { ForwardedRef, JSX } from 'react';
import type { ListBoxSectionProps } from 'react-aria-components';

import {
  Collection,
  Header,
  ListBoxSection,
  Separator,
} from 'react-aria-components';
import { tv } from 'tailwind-variants';

const selectOptionGroup = tv({
  slots: {
    base: '',
    header:
      'text-content-neutral-enabled typography-body-strong pt-2 pb-2 pl-3 pr-3',
    separator: 'h-[1px] bg-surface-neutral-lowest w-full mb-2 mt-2 last:hidden',
  },
});

export interface SelectOptionGroupProps<T extends object>
  extends ListBoxSectionProps<T> {
  label: string;
}

const SelectOptionGroupImpl = <T extends object>(
  { label, children, items }: SelectOptionGroupProps<T>,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { base, header, separator } = selectOptionGroup();

  return (
    <>
      <ListBoxSection ref={ref} className={base()} id={label} items={items}>
        <Header className={header()}>{label}</Header>
        {items ? (
          <Collection items={items}>{children}</Collection>
        ) : (
          <>{children}</>
        )}
      </ListBoxSection>
      <Separator orientation="horizontal" className={separator()} />
    </>
  );
};

type SelectOptionGroupComponent = (<TItems extends object>(
  props: SelectOptionGroupProps<TItems> & {
    ref?: ForwardedRef<HTMLDivElement>;
  }
) => JSX.Element) & {
  displayName?: string;
};

const SelectOptionGroup = forwardRef(function UnitySelectOptionGroup<
  TItems extends object
>(props: SelectOptionGroupProps<TItems>, ref: ForwardedRef<HTMLDivElement>) {
  return SelectOptionGroupImpl<TItems>(props, ref);
}) as SelectOptionGroupComponent;

SelectOptionGroup.displayName = 'SelectOptionGroup';

export { SelectOptionGroup };
