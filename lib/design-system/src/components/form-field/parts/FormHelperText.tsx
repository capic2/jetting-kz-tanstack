import type { PropsWithChildren } from 'react';
import { forwardRef } from 'react';

import { Text } from '../../text/Text';

/**
 * FormHelperText is a component that displays helper text for a form field.
 */
const FormHelperText = forwardRef<HTMLElement, PropsWithChildren<unknown>>(
  ({ children, ...props }, ref) => {
    return (
      <Text
        {...props}
        //id={formDescriptionId}
        data-unity-slot="helper-text"
        variant="bodySmall"
        color="content.neutral.low"
        ref={ref}
      >
        {children}
      </Text>
    );
  }
);

FormHelperText.displayName = 'HelperText';

export { FormHelperText };
