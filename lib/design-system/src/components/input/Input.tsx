import { forwardRef } from 'react'

import type { ReactElement } from 'react'
import type { InputProps as AriaInputProps } from 'react-aria-components'

import { Input as AriaInput } from 'react-aria-components'
//import { useIntl } from 'react-intl'
import { tv } from 'tailwind-variants'

const input = tv({
  slots: {
    base: 'flex h-500 border rounded-100 focus-within:outline-none focus-within:ring-2 focus-within:ring-utility-focus-ring focus-within:ring-offset-2 active:border-border-form-active',
    prefix:
      'flex-grow-0 content-center pt-100 pb-100 pl-150 pr-150 border-r rounded-l-100 active:border-border-form-active',
    inputWrapper:
      'flex gap-50 flex-grow pt-100 pb-100 pl-150 pr-150 rounded-100',
    input:
      'flex-grow outline-none typography-body placeholder:text-content-neutral-lowest',
    state: 'flex gap-50 items-center',
    suffix:
      'flex-grow-0 content-center pt-100 pb-100 pl-150 pr-150 border-l rounded-r-100 active:border-border-form-active',
  },
  variants: {
    isInvalid: {
      true: {
        base: 'border-border-form-error bg-surface-form-error',
        prefix: 'bg-surface-form-error border-border-form-error',
        inputWrapper: 'bg-surface-form-error',
        input: 'bg-surface-form-error',
        state: 'text-content-form-error',
        suffix: 'bg-surface-form-error border-border-form-error',
      },
    },
    isReadOnly: {
      true: {
        base: 'border-border-form-disabled bg-surface-form-disabled',
        prefix:
          'bg-surface-form-disabled border-border-form-disabled text-content-form-readonly',
        inputWrapper:
          'border-border-form-disabled bg-surface-form-disabled',
        input: 'bg-surface-form-disabled text-content-form-readonly',
        suffix:
          'bg-surface-form-disabled border-border-form-disabled text-content-form-readonly',
      },
    },
    isDisabled: {
      true: {
        base: 'border-border-form-disabled bg-surface-form-disabled',
        prefix:
          'bg-surface-form-disabled border-border-form-disabled text-content-form-disabled',
        inputWrapper:
          'bg-surface-form-disabled text-content-form-disabled',
        input: 'bg-surface-form-disabled text-content-form-disabled',
        suffix:
          'bg-surface-form-disabled border-border-form-disabled text-content-form-disabled',
      },
    },
  },
  compoundVariants: [
    {
      isInvalid: false,
      isDisabled: false,
      isReadOnly: false,
      className: {
        base: 'border-border-form-enabled bg-surface-form-enabled',
        prefix:
          'bg-surface-neutral-low border-border-form-enabled text-content-form-enabled',
        inputWrapper:
          'border-border-form-enabled bg-surface-form-enabled',
        input: 'text-content-form-enabled bg-surface-form-enabled',
        state: 'text-content-neutral-disabled',
        suffix:
          'border-border-form-enabled bg-surface-neutral-low text-content-form-enabled',
      },
    },
  ],
})

export interface InputProps
  extends Omit<AriaInputProps, 'prefix' | 'style' | 'className'> {
  /**
   * The type of the input field
   * @default 'text'
   */
  type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search'
  /** Element to display before the input field */
  prefix?: ReactElement
  /** Element to display after the input field */
  suffix?: ReactElement
  /** Whether the field is required */
  isRequired?: boolean
  /** Whether the field is in an invalid state */
  isInvalid?: boolean
  /** Whether the field is in a loading state */
  isLoading?: boolean
  /** Whether the field is disabled */
  isDisabled?: boolean
  /** Whether the field is read-only */
  isReadOnly?: boolean
  /**
   * Clear button click handler
   */
  onClearButtonPress?: () => void
}

/**
 * The `Input` components displays a styled, single HTML `<input>` field whose type is text-compatible (`text`, `password`, `email`, `tel`, `url`, `search`), and follows the Unity design system language. It supports multiple states out of the box and can be used as a controlled or uncontrolled component. It is also compatible with the `Form` and `FormField` component as a form control.
 * @param {InputProps} props - Regular props from the `<input>` HTML element, plus state-related props
 * @see {@link InputProps} for all available props
 * @example
 * ```tsx
 * import { Input } from '@payfit/unity-components'
 *
 * function Example() {
 *   const [value, setValue] = useState()
 *
 *   const handleInputChange = (e) => {
 *     setValue(e.target.value)
 *   }
 *
 *   return <Input type="text" placeholder="write something..." value={value} onChange={handleInputChange} />
 * }
 * ```
 */
const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type = 'text',
      prefix,
      suffix,
      isInvalid,
      isLoading,
      isDisabled,
      isReadOnly,
      onClearButtonPress,
      ...props
    },
    ref,
  ) => {
    //const intl = useIntl()

    const {
      base,
      prefix: prefixStyle,
      inputWrapper,
      input: inputStyle,
      //state,
      suffix: suffixStyle,
    } = input({
      isInvalid: !!isInvalid,
      isReadOnly: !!isReadOnly,
      isDisabled: !!isDisabled,
    })

    /*const displayClearButton =
      props.value && !isLoading && !isReadOnly && !isDisabled*/

    return (
      <div className={base()}>
        {prefix ? <span className={prefixStyle()}>{prefix}</span> : null}
        <div className={inputWrapper()}>
          <AriaInput
            {...props}
            ref={ref}
            type={type}
            className={inputStyle()}
            aria-busy={isLoading}
            readOnly={isReadOnly}
            disabled={isDisabled}
          />
          {/*<div className={state()}>
            {isLoading && (
              <Spinner
                color="inherit"
                size="small"
                label={intl.formatMessage({
                  id: 'unity:component:form-field:form-input:spinner:label',
                  defaultMessage: 'Loading',
                })}
              />
            )}
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
            {displayClearButton && (
              <CircularIconButton
                title={intl.formatMessage({
                  id: 'unity:component:form-field:form-input:clear:title',
                  defaultMessage: 'Clear',
                })}
                className="text-content-neutral-enabled"
                icon="CloseOutlined"
                onPress={() => {
                  onClearButtonPress?.()
                }}
              />
            )}
          </div>*/}
        </div>
        {suffix ? <span className={suffixStyle()}>{suffix}</span> : null}
      </div>
    )
  },
)

Input.displayName = 'Input'

export { Input }
