// Replace your-framework with the framework you are using, e.g. react-vite, nextjs, nextjs-vite, etc.
import type { StoryObj } from '@storybook/react-vite';
import { z } from 'zod';
import { useCustomForm } from '../../hooks/customForm';
import * as console from 'node:console';
//👇 This default export determines where your story goes in the story list
const meta = {
  /*component: YourComponent,*/
}; /*satisfies Meta<typeof YourComponent>;*/

export default meta;
type Story = StoryObj /*<typeof meta>*/;

function FieldInfo({ field }: { field: AnyFieldApi }) {
  return (
    <>
      {field.state.meta.isTouched && !field.state.meta.isValid ? (
        <em>{field.state.meta.errors.map((err) => err.message).join(',')}</em>
      ) : null}
      {field.state.meta.isValidating ? 'Validating...' : null}
    </>
  );
}

export const FirstStory: Story = {
  render: function Render() {
    const ZodSchema = z.object({
      firstName: z
        .string()
        .min(3, '[Zod] You must have a length of at least 3')
        .startsWith('A', "[Zod] First name must start with 'A'"),
      lastName: z.string().min(3, '[Zod] You must have a length of at least 3'),
    });

    const form = useCustomForm({
      defaultValues: {
        firstName: '',
        lastName: '',
      },
      validators: {
        onChange: ZodSchema,
      },
      onSubmit: async ({ value }) => {
        // Do something with form data
        console.log(value);
      },
    });

    return (
      <div>
        <h1>Standard Schema Form Example</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <div>
            {/* A type-safe field component*/}
            <form.AppField
              name="firstName"
              children={(field) => <field.TextField label="firstName" />}
            />
          </div>
          <div>
            <form.Field
              name="lastName"
              children={(field) => (
                <>
                  <label htmlFor={field.name}>Last Name:</label>
                  <input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <FieldInfo field={field} />
                </>
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
        </form>
      </div>
    );
  },
};
