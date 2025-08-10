import { forwardRef } from 'react';

import { Button, SelectValue } from 'react-aria-components';
//import { useIntl } from 'react-intl'
import { tv } from 'tailwind-variants';

//import { Icon } from '../../icon/Icon'

const selectButton = tv({
  slots: {
    base: 'flex flex-row gap-2 pt-2 pb-2 pl-3 pr-3 rounded-md border-solid focus-visible:ring-2 focus-visible:ring-utility-focus-ring focus-visible:ring-offset-2 outline-none border',
    selectValue:
      'whitespace-nowrap text-ellipsis typography-body flex-grow text-left data-[placeholder]:text-content-neutral-lowest',
    iconWrapper: 'flex gap-1',
    icon: '',
  },
  variants: {
    isDisabled: {
      true: {
        base: 'border-border-form-disabled bg-surface-form-disabled',
        selectValue: 'text-content-form-disabled',
      },
    },
    isInvalid: {
      true: {
        base: 'border-border-form-error bg-surface-form-error',
      },
    },
    isReadOnly: {
      true: {
        base: 'border-border-form-disabled',
        selectValue: 'text-content-form-readonly',
        icon: 'text-content-primary-disabled',
      },
    },
  },
  compoundVariants: [
    {
      isDisabled: false,
      isInvalid: false,
      isReadOnly: false,
      className: {
        base: 'border-border-form-enabled hover:border-border-form-hover bg-surface-form-enabled hover:bg-surface-form-hover active:border-border-form-active',
        selectValue:
          'text-content-neutral-enabled hover:text-content-neutral-hover',
        icon: 'text-content-neutral-low hover:text-content-form-hover',
      },
    },
  ],
  defaultVariants: {
    isDisabled: false,
    isInvalid: false,
    isReadOnly: false,
  },
});

export interface SelectButtonProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  isReadOnly?: boolean;
  isOpen: boolean;
}

const SelectButton = forwardRef<HTMLButtonElement, SelectButtonProps>(
  ({ isDisabled, isInvalid, isReadOnly, isOpen }, ref) => {
    //const intl = useIntl()
    const { base, selectValue /*, iconWrapper, icon*/ } = selectButton({
      isDisabled,
      isInvalid,
      isReadOnly,
    });

    return (
      <Button
        data-dd-privacy="mask"
        className={base()}
        ref={ref}
        isDisabled={isDisabled}
      >
        <SelectValue className={selectValue()} />
        {/*<div className={iconWrapper()}>
          {isInvalid && (
            <Icon
              src="WarningCircleOutlined"
              color="content.form.invalid"
              alt={intl.formatMessage({
                id: 'unity:component:form-field:form-input:error:alt',
                defaultMessage: 'Error',
              })}
            />
          )}
          <Icon
            className={icon()}
            aria-hidden="true"
            src={isOpen ? 'CaretUpOutlined' : 'CaretDownOutlined'}
          />
        </div>*/}
      </Button>
    );
  }
);

SelectButton.displayName = 'SelectButton';

export { SelectButton };
