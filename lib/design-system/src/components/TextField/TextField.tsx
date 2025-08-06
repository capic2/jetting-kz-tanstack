import { Input } from 'react-aria-components';
import { useCustomFieldContext } from '../../hooks/customForm';
import { ForwardedRef, forwardRef, HTMLAttributes, ReactNode } from 'react';
import { tv } from 'tailwind-variants';
import { FormLabel } from '../form-field/parts/FormLabel';
import { FormHelperText } from '../form-field/parts/FormHelperText';
import { FormFeedbackText } from '../form-field/parts/FormFeedbackText';
import { LabelProps } from '../label/Label';

interface TextFieldProps
  extends Pick<LabelProps, 'isRequired' | 'requiredVariant'> {
  /** The name of the field, which should match the form schema. */
  name: string;
  /** The label for the text field. */
  label: string;
  /** If true, the text field will be a multi-line text area. */
  multiline?: boolean;
  /** The default value of the text field. */
  defaultValue?: HTMLAttributes<HTMLInputElement>['defaultValue'];
  /** Helper text to display below the text field. */
  helperText?: ReactNode;
  /** Feedback text to display below the text field. */
  feedbackText?: ReactNode;
  /** A contextual link to display below the text field. */
  contextualLink?: ReactNode;

  type?: 'text' | 'password' | 'email' | 'tel' | 'url' | 'search';
}

const textField = tv({
  base: 'flex flex-col gap-100',
});

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (
    {
      name,
      label,
      defaultValue,
      helperText,
      feedbackText,
      contextualLink,
      multiline,
      isRequired,
      requiredVariant,
      ...controlProps
    },
    ref
  ) => {
    //const field = useCustomFieldContext<string>();

    return (
      <div className={textField()}>
        {/*<FormLabel requiredVariant={requiredVariant}>{label}</FormLabel>*/}
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
        <Input
          ref={ref as ForwardedRef<HTMLInputElement>}
          defaultValue={defaultValue}
          //value={field.state.value}
          //onChange={(e) => field.handleChange(e.target.value)}
          //onBlur={field.handleBlur}
          /* onClearButtonPress={handleClearButton}*/
        />
        {/*<FormFeedbackText>{feedbackText}</FormFeedbackText>*/}
      </div>
    );
  }
);

export { TextField };
