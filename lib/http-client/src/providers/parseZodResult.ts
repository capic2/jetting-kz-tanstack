import type { ResponsePromise } from 'ky';

import * as v4 from 'zod/v4/core';

export const parseZodResult = async <
  TSchema extends v4.$ZodType
>({
  kyMethod,
  schema,
}: {
  kyMethod: () => ResponsePromise;
  schema: TSchema;
}) => {
  const response = await kyMethod();
  const data = response.status === 204 ? null : await response.json();

  return v4.parse(schema, data);
};

 export type ParseZodResult = typeof parseZodResult
