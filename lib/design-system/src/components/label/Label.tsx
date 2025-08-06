import { forwardRef } from 'react'

import type { LabelProps as AriaLabelProps } from 'react-aria-components'

import { mergeProps } from 'react-aria'
import {
  Label as AriaLabel,
  InputContext,
  useSlottedContext,
} from 'react-aria-components'
import { tv } from 'tailwind-variants'

export interface LabelProps extends AriaLabelProps {
  /**
   * Whether the field is required.
   */
  isRequired?: boolean
  /**
   * The variant of the required label.
   */
  requiredVariant?: 'required' | 'optional'
}

const label = tv({
  slots: {
    base: 'typography-body-strong text-content-form-enabled flex gap-25',
    asterisk: 'text-content-danger',
    optionalTag: 'typography-body',
  },
  variants: {
    variant: {
      strong: {
        base: 'typography-body-strong',
      },
      body: {
        base: 'typography-body',
      },
    },
  },
  defaultVariants: {
    variant: 'strong',
  },
})

/**
 * FormLabel is a component that displays a label for a form field.
 * It is used to provide context for the form field.
 */
const Label = forwardRef<HTMLLabelElement, LabelProps>(
  ({ children, ...userProps }, ref) => {
    const inputContext = useSlottedContext(InputContext)
    const finalProps = mergeProps(
      { isRequired: inputContext?.['aria-required'] },
      userProps,
    )
    const {
      isRequired = false,
      requiredVariant = 'required',
      ...labelProps
    } = finalProps
    const { base, asterisk, optionalTag } = label()

    return (
      <AriaLabel
        {...labelProps}
        ref={ref}
        className={base({ className: userProps.className })}
      >
        {children}
        {requiredVariant === 'required' && isRequired && (
          <span className={asterisk()}>
            *<span className="sr-only">required</span>
          </span>
        )}
        {requiredVariant === 'optional' && !isRequired && (
          <span className={optionalTag({ className: userProps.className })}>
            (optional)
          </span>
        )}
      </AriaLabel>
    )
  },
)

Label.displayName = 'Label'

export { Label }
