import { z } from 'zod';
import { createContext, PropsWithChildren, useContext } from 'react';

interface FormContextValue {
  schema: z.ZodObject | null;
}

export const FormContext = createContext<FormContextValue>({ schema: null });

export function FormProvider({
  children,
  schema,
}: PropsWithChildren<FormContextValue>) {
  return (
    <FormContext.Provider value={{ schema }}>{children}</FormContext.Provider>
  );
}

export function useForm() {
  const context = useContext(FormContext);

  if (!context) {
    throw new Error('useForm should be used within <FormProvider> component');
  }

  return context;
}
