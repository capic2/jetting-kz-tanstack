import { forwardRef } from 'react';

import type { ReactNode } from 'react';
import type { ListBoxItemProps } from 'react-aria-components';

import { ListBoxItem } from 'react-aria-components';
import { tv } from 'tailwind-variants';

//import { Icon } from '../../icon/Icon'
import { SelectOptionProvider } from './SelectOption.context';

const selectOption = tv({
  base: 'flex flex-col typography-body rounded-1 pt-2 pb-2 pl-3 pr-3 outline-none',
  variants: {
    isFocusVisible: {
      true: 'outline-offset-2 outline-2 outline-utility-focus-ring',
    },
    isHovered: {
      true: 'bg-surface-neutral-hover text-content-neutral',
    },
    isPressed: {
      true: 'bg-surface-neutral-pressed text-content-neutral-pressed',
    },
    isSelected: {
      true: 'bg-surface-neutral-active text-content-neutral-active',
    },
    isDisabled: {
      true: 'text-content-neutral-disabled',
    },
  },
  compoundVariants: [
    {
      isFocusVisible: false,
      isHovered: false,
      isPressed: false,
      isSelected: false,
      isDisabled: false,
      class: 'bg-surface-neutral-enabled text-content-neutral-enabled',
    },
  ],
});

type SelectOptionProps = Omit<ListBoxItemProps, 'children'> & {
  children: ReactNode;
};

/**
 * SelectOption component for displaying options in a Select dropdown.
 * @note The `textValue` prop (inherited from ListBoxItemProps) is used for searching when the content
 * of the option is more complex than a simple string (e.g., contains components
 * like Avatar, Flex, etc.). Providing this prop enables search functionality
 * for complex content options.
 */
const SelectOption = forwardRef<HTMLDivElement, SelectOptionProps>(
  (props, ref) => {
    const { children, isDisabled, textValue } = props;

    return (
      <ListBoxItem
        {...props}
        ref={ref}
        data-dd-privacy="mask"
        textValue={textValue}
        className={({ isHovered, isPressed, isFocusVisible, isSelected }) =>
          selectOption({
            isHovered,
            isPressed,
            isFocusVisible,
            isSelected,
            isDisabled,
          })
        }
      >
        {({ isSelected }) => (
          <SelectOptionProvider isDisabled={isDisabled}>
            {isSelected ? (
              <div className="flex justify-between">
                <div className="flex flex-col">
                  {/* hack to make typescript happy... */}
                  <>{children}</>
                </div>
                {/*<Icon src="CheckOutlined" />*/}
              </div>
            ) : (
              <>{children}</>
            )}
          </SelectOptionProvider>
        )}
      </ListBoxItem>
    );
  }
);

SelectOption.displayName = 'SelectOption';

export { SelectOption };
