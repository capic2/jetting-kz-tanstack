import { forwardRef } from 'react';

import type { LabelProps } from '../../label/Label';
import { Label } from '../../label/Label';
import { useCustomFieldContext } from '../../../hooks/customForm';
import { isFieldRequired } from '../utils/isFieldRequired';
import { useForm } from '../../form/form.context';

export type FormLabelProps = Omit<LabelProps, 'isRequired'>;

/**
 * FormLabel is a component that displays a label for a form field.
 * It is used to provide context for the form field.
 */
const FormLabel = forwardRef<HTMLLabelElement, FormLabelProps>(
  ({ children, ...props }, ref) => {
    const { requiredVariant } = props;
    const field = useCustomFieldContext<string>();
    const { schema } = useForm();

    const isRequired = isFieldRequired(schema, field.name);

    return (
      <Label
        ref={ref}
        //id={formLabelId}
        isRequired={isRequired}
        requiredVariant={requiredVariant}
        //htmlFor={formItemId}
        className="leading-2"
        {...props}
      >
        {children}
      </Label>
    );
  }
);

FormLabel.displayName = 'Label';

export { FormLabel };
