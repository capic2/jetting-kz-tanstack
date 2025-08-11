import { http, HttpResponse } from 'msw'

export const createThirdPartiesMock = () => [
  http.get('https://translations.payfit.com/*', () => {
    return HttpResponse.json({})
  }),
  http.get('https://cdn.segment.com/*', () => {
    return HttpResponse.json({})
  }),

  http.get(`https://app.launchdarkly.com/*`, () => {
    return HttpResponse.json({})
  }),
  http.post('https://app.launchdarkly.com/*', () => {
    return HttpResponse.json({})
  }),
  http.post('https://events.launchdarkly.com/*', () => {
    return HttpResponse.json({})
  }),
]
