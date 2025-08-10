import { createFileRoute } from '@tanstack/react-router';
import { Form, useCustomAppForm } from '@jetting-kz-tanstack/design-system';
import { z } from 'zod';

export const Route = createFileRoute('/settings')({
  component: Settings,
});

const schema = z.object({ engineType: z.string() });

function Settings() {
  const form = useCustomAppForm({
    validators: {
      onBlur: schema,
    },
  });
  return <Form schema={schema} onSubmit={}></Form>;
}
