import { setupServer } from 'msw/node'

import { createFakeApiMock } from './handlers/fake'
import { createThirdPartiesMock } from './handlers/third-parties'

export const createServer = (baseUrl: string) =>
  setupServer(...createThirdPartiesMock(), ...createFakeApiMock(baseUrl))
