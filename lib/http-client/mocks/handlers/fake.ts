import { http, HttpResponse } from 'msw'

export const createFakeApiMock = (apiBaseURL: string) => [
  http.post(`${apiBaseURL}/api/fake`, () => {
    return HttpResponse.json({ message: 'hello' })
  }),
]
