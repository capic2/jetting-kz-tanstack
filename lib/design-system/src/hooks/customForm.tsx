import { createFormHook, createFormHookContexts } from '@tanstack/react-form';
import { TextField } from '../components/TextField/TextField';
import { Button } from 'react-aria-components';

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
  useAppForm: useCustomForm,
  withForm: withCustomForm,
  withFieldGroup: withCustomFieldGroup,
} = createFormHook({
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubscribeButton,
  },
  fieldContext,
  formContext,
});

export {
  useCustomForm,
  withCustomForm,
  withCustomFieldGroup,
  useCustomFieldContext,
};
