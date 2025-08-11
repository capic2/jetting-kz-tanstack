import type { PropsWithChildren } from 'react';
import { createContext, useContext } from 'react';

import type { KyInstance } from 'ky';
import ky from 'ky';

import type { ParseZodResult } from './parseZodResult';
import { parseZodResult } from './parseZodResult';

export const CHECK_EDGE_PATHNAME = '/check-edge';

const FetchClientProviderContext = createContext<
  | {
      api: KyInstance;
      parseZodResult: ParseZodResult;
    }
  | undefined
>(undefined);

const FetchClientProvider = ({
  children,
  apiURL,
}: PropsWithChildren<{ apiURL: string }>) => {
  const api = ky.create({
    prefixUrl: apiURL,
    retry: 0,
  });

  return (
    <FetchClientProviderContext.Provider value={{ api, parseZodResult }}>
      {children}
    </FetchClientProviderContext.Provider>
  );
};

/**
 * @description
 * This function is an abstraction around the ky instance exposed by a hook. It provides a simple interface to handle API calls,
 * validate API responses with Zod, and send errors to Datadog.
 * Unlike useAuthenticatedFetchClient, this hook does not add any credentials to the request.
 * @example
 * ```tsx
 * import { useQuery } from '@tanstack/react-query'
 * import { useFetchClient } from '@payfit/http-client';
 * import { z } from 'zod'
 *
 * const ZodCompanyInfoSchema = z.object({ test: z.boolean })
 *
 * const MyComponent = () => {
 *   const { parseZodResult, api } = useFetchClient();
 *
 *   const result = useQuery({
 *      queryKey: ['some-unique-key'],
 *      queryFn: async ({ signal }) => {
 *        // With zod validation
 *        const data = await parseZodResult(() => api.post('hr/company/info', { signal }), ZodCompanyInfoSchema)
 *        // Without validation
 *        // const data = await api.post('hr/company/info', { signal }).json()
 *
 *        return data
 *      }
 *   })
 *
 *  // Your react logic here
 * ```
 * @see {@link https://github.com/sindresorhus/ky} ky instance API.
 */
export const useFetchClient = () => {
  const contextData = useContext(FetchClientProviderContext);
  if (!contextData) {
    throw new Error('useFetchClient must be used within a FetchClientProvider');
  }
  return contextData;
};

export { FetchClientProvider };
export type { ParseZodResult };
