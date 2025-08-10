import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { Button } from 'react-aria-components';
import { lazy } from 'react';
import { lazyWithGenerics } from '../utils/lazyWIthGenerics';

const SelectField = lazyWithGenerics(async () => ({
  default: (await import('../components/select-field/SelectField')).SelectField,
}));

const {
  fieldContext,
  formContext,
  useFormContext,
  useFieldContext: useCustomFieldContext,
} = createFormHookContexts();

const SubscribeButton = ({ label }: { label: string }) => {
  const form = useFormContext();
  return (
    <form.Subscribe selector={(state) => state.isSubmitting}>
      {(isSubmitting) => <Button isDisabled={isSubmitting}>{label}</Button>}
    </form.Subscribe>
  );
};

const {
  useAppForm: useCustomAppForm,
  withForm: withCustomForm,
  withFieldGroup: withCustomFieldGroup,
} = createFormHook({
  fieldComponents: {
    SelectField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

export {
  useCustomAppForm,
  withCustomForm,
  withCustomFieldGroup,
  useCustomFieldContext,
};
