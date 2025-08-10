import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { Text } from '../../text/Text';
import { useStore } from '@tanstack/react-form';
import { useCustomFieldContext } from '../../../hooks/customForm';
import { ZodError } from 'zod';

/**
 * FormErrorText is a component that displays error text for a form field.
 */
const FormFeedbackText = forwardRef<
  HTMLParagraphElement,
  PropsWithChildren<unknown>
>(({ children, ...props }, ref) => {
  const field = useCustomFieldContext<string>();
  const errors: ZodError[] = useStore(
    field.store,
    (state) => state.meta.errors
  );

  const body =
    errors.length > 0 ? (
      <ul>
        {errors.map((error) => (
          <li>{error.message}</li>
        ))}
      </ul>
    ) : (
      children
    );

  if (!body) {
    return null;
  }

  return (
    <Text
      {...props}
      //id={formMessageId}
      ref={ref}
      data-unity-slot="form-feedback-text"
      className="typography-body-small-strong text-content-form-invalid"
    >
      {body}
    </Text>
  );
});

FormFeedbackText.displayName = 'FormFeedbackText';

export { FormFeedbackText };
