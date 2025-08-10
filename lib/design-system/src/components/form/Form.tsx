import { PropsWithChildren } from 'react';
import { FormProvider } from './form.context';
import { z } from 'zod';
import type { FormProps as AriaFormProps } from 'react-aria-components';
import { Form as AriaForm } from 'react-aria-components';

interface FormProps extends AriaFormProps {
  schema: z.ZodObject;
  onSubmit: AriaFormProps['onSubmit'];
}

const Form = ({ children, schema, onSubmit }: PropsWithChildren<FormProps>) => {
  return (
    <FormProvider schema={schema}>
      <AriaForm onSubmit={onSubmit}>{children}</AriaForm>
    </FormProvider>
  );
};

export { Form };
