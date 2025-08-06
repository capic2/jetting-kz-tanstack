import { forwardRef } from 'react';

import type { LabelProps } from '../../label/Label';
import { Label } from '../../label/Label';

export type FormLabelProps = Omit<LabelProps, 'isRequired'>;

/**
 * FormLabel is a component that displays a label for a form field.
 * It is used to provide context for the form field.
 */
const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, ...props }, ref) => {
    const { requiredVariant } = props

    return (
      <Label
        ref={ref}
        //id={formLabelId}
        //isRequired={isRequired}
        requiredVariant={requiredVariant}
        //htmlFor={formItemId}
        className="leading-100"
        {...props}
      >
        {children}
      </Label>
    )
  },
)

FormLabel.displayName = 'Label'

export { FormLabel }
