import type { ZodObject, ZodRawShape, ZodTypeAny } from 'zod'

import { z } from 'zod'

/**
 * Determines if a field is required based on its path in a Zod schema
 * @param schema - The Zod schema object
 * @param fieldPath - The path to the field (e.g., "preferences.marketing")
 * @returns true if the field is required, false if optional or not found
 */
export function isFieldRequired(
  schema: ZodObject<ZodRawShape> | null | undefined,
  fieldPath: string,
): boolean {
  try {
    if (!schema) return false

    // Split the field path into parts (e.g., "preferences.marketing" -> ["preferences", "marketing"])
    const pathParts = fieldPath.split('.')

    let currentShape = schema.shape
    let field: ZodTypeAny | undefined

    // Traverse the schema shape following the path
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i]
      field = currentShape[part as keyof typeof currentShape]

      // If we can't find the field at any point, return false
      if (!field) return false

      // If this is not the last part, we need to get the nested shape
      if (i < pathParts.length - 1) {
        // Handle both optional and required object fields
        const shape =
          field instanceof z.ZodOptional
            ? (field._def.innerType as ZodObject<ZodRawShape>).shape
            : (field as ZodObject<ZodRawShape>).shape

        if (!shape) return false
        currentShape = shape
      }
    }

    // Check if the final field is optional
    return field ? !(field instanceof z.ZodOptional) : false
  } catch {
    return false
  }
}
