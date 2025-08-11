import { createFileRoute } from '@tanstack/react-router';
import {
  Form,
  SelectOption,
  useCustomAppForm,
} from '@jetting-kz-tanstack/design-system';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useFetchClient } from '@jetting-kz-tanstack/http-client';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

const schema = z.object({ engineType: z.string() });

function Settings() {
  const { parseZodResult, api } = useFetchClient();
  const mutation = useMutation({
    mutationFn: async (newTodo) => {
      return await parseZodResult({ kyMethod: () => api.post(''), schema });
    },
  });
  const form = useCustomAppForm({
    validators: {
      onBlur: schema,
    },
  });
  return (
    <Form
      schema={schema}
      onSubmit={() => {
        mutation.mutate();
      }}
    >
      <form.AppField
        name="engineType"
        children={(field) => (
          <field.SelectField
            label="Engine"
            name="engineType"
            items={[
              { id: 'k9', name: 'k9' },
              { id: 'k9b', name: 'k9b' },
              { id: 'k9c', name: 'k9c' },
              { id: 'k10', name: 'k10' },
              { id: 'k10b', name: 'k10b' },
              { id: 'k10c', name: 'k10c' },
              { id: 'r1', name: 'r1' },
            ]}
          >
            {(item) => <SelectOption>{item.name}</SelectOption>}
          </field.SelectField>
        )}
      />
    </Form>
  );
}
