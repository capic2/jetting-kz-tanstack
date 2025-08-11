import { HTTPError } from 'ky'

/**
 * Checks if an error is an HTTP error with a specific status code
 * @param error - The error to check, can be null
 * @param statusCode - The HTTP status code to compare against
 * @returns true if the error is an HTTPError with matching status code, false otherwise
 * @example
 * ```ts
 * if (isHttpError(error, 404)) {
 *   // Handle 404 not found error
 * }
 * ```
 */

export function isHttpError(error: Error | null, statusCode: number) {
  if (!error) {
    return false
  }

  if (error instanceof HTTPError) {
    return error.response.status === statusCode
  }
  return false
}
