// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { StoryObj } from '@storybook/react-vite';
import { z } from 'zod';
import { useCustomAppForm } from '../../hooks/customForm';
import * as console from 'node:console';
import { Form } from './Form';
import { SelectOption } from '../select/parts/SelectOption';
//👇 This default export determines where your story goes in the story list
const meta = {
  /*component: YourComponent,*/
}; /*satisfies Meta<typeof YourComponent>;*/

export default meta;
type Story = StoryObj /*<typeof meta>*/;

export const FirstStory: Story = {
  render: function Render() {
    const ZodSchema = z.object({
      engine: z.string(),
    });

    const form = useCustomAppForm({
      defaultValues: {
        engine: 'r1',
      },
      validators: {
        onBlur: ZodSchema,
      },
      onSubmit: async ({ value }) => {
        // Do something with form data
        console.log(value);
      },
    });

    return (
      <div>
        <h1>Standard Schema Form Example</h1>
        <Form
          schema={ZodSchema}
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            void form.handleSubmit();
          }}
        >
          <div>
            <form.AppField
              name="engine"
              children={(field) => (
                <field.SelectField
                  label="Engine"
                  name="engine"
                  items={[
                    { id: 'k9', value: 'k9' },
                    { id: 'k9b', value: 'k9b' },
                    { id: 'k9c', value: 'k9c' },
                    { id: 'k10', value: 'k10' },
                    { id: 'k10b', value: 'k10b' },
                    { id: 'k10c', value: 'k10c' },
                    { id: 'r1', value: 'r1' },
                  ]}
                >
                  {(item) => <SelectOption>{item.value}</SelectOption>}
                </field.SelectField>
              )}
            />
          </div>

          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <button type="submit" disabled={!canSubmit}>
                {isSubmitting ? '...' : 'Submit'}
              </button>
            )}
          />
        </Form>
      </div>
    );
  },
};
