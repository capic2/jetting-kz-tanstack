import { createContext, useContext } from 'react'

import type { PropsWithChildren } from 'react'
import type { FieldPath, FieldValues } from 'react-hook-form'

import { useFormContext, useFormState } from 'react-hook-form'

interface FormFieldContextValue<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> {
  id: string
  name: TName
  isRequired?: boolean
  isInvalid?: boolean
  isLoading?: boolean
  isReadOnly?: boolean
  isDisabled?: boolean
  hasHelperText?: boolean
  hasContextualLink?: boolean
}

export const FormFieldContext = createContext<FormFieldContextValue>({
  id: '',
  name: '',
})

export function FormFieldProvider({
  children,
  id,
  name,
  isRequired,
  isInvalid,
  isLoading,
  isReadOnly,
  isDisabled,
  hasHelperText,
  hasContextualLink,
}: PropsWithChildren<FormFieldContextValue>) {
  return (
    <FormFieldContext.Provider
      value={{
        id,
        name,
        isRequired,
        isInvalid,
        isLoading,
        isReadOnly,
        isDisabled,
        hasHelperText,
        hasContextualLink,
      }}
    >
      {children}
    </FormFieldContext.Provider>
  )
}

export function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const { getFieldState } = useFormContext()
  const formState = useFormState({ name: fieldContext.name })
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { invalid: _, ...fieldState } = getFieldState(
    fieldContext.name,
    formState,
  )
  const {
    id: formFieldId,
    isRequired,
    isInvalid,
    isLoading,
    isReadOnly,
    isDisabled,
    hasHelperText,
    hasContextualLink,
  } = fieldContext

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField> component')
  }

  const a11yProps = {
    id: formFieldId,
    name: fieldContext.name,
    hasHelperText,
    hasContextualLink,
    formLabelId: `${formFieldId}-form-field-label`,
    formItemId: `${formFieldId}-form-item`,
    formDescriptionId: hasHelperText
      ? `${formFieldId}-form-field-description`
      : undefined,
    formMessageId: `${formFieldId}-form-field-feedback-text`,
    formContextualLinkId: hasContextualLink
      ? `${formFieldId}-form-field-contextual-link`
      : undefined,
  }

  return {
    ...a11yProps,
    fieldState: {
      ...fieldState,
      isRequired,
      isInvalid,
      isLoading,
      isReadOnly,
      isDisabled,
    },
    formState,
  }
}
