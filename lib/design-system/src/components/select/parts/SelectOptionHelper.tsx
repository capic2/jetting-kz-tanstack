import { forwardRef } from 'react';

import type { PropsWithChildren } from 'react';

import { tv } from 'tailwind-variants';

import { useSelectOptionContext } from './SelectOption.context';

const selectOptionHelper = tv({
  base: 'typography-body',
  variants: {
    isDisabled: {
      true: 'text-content-neutral-disabled',
      false: 'text-content-neutral-low',
    },
  },
});

const SelectOptionHelper = forwardRef<HTMLSpanElement, PropsWithChildren>(
  ({ children }, ref) => {
    const { isDisabled } = useSelectOptionContext();

    const clx = selectOptionHelper({ isDisabled });

    return (
      <span className={clx} ref={ref} data-dd-privacy="mask">
        {children}
      </span>
    );
  }
);

SelectOptionHelper.displayName = 'SelectOptionHelper';

export { SelectOptionHelper };
