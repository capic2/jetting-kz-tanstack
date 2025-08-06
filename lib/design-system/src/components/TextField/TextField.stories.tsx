import { TextField } from './TextField';
import { Meta, StoryObj } from '@storybook/react-vite';
import { useCustomForm } from '../../hooks/customForm';
import { useForm } from '@tanstack/react-form';
import { z } from 'zod';

const meta = {
  component: TextField,
  args: {
    label: 'Label',
  },
  render: function Render(args, context) {
    const schema = z.object({ textfield: z.string() });
    const form = useCustomForm({
      validators: {
        onChange: schema,
      },
    });

    return (
      <form>
        <form.AppField
          name="textfield"
          children={(field) => <field.TextField {...args} />}
        />
      </form>
    );
  },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FirstStory: Story = {};
