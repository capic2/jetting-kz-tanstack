import { z } from 'zod';

export function isFieldRequired<T extends z.ZodRawShape, K extends keyof T>(
  schema: z.ZodObject<T> | null,
  field: K
): boolean {
  if (!schema) {
    return false;
  }

  const fieldSchema = schema.shape[field] as unknown as z.ZodTypeAny;
  return !fieldSchema.safeParse(undefined).success;
}
