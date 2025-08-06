import { initialize, mswLoader } from 'msw-storybook-addon'
import '../src/styles.css'

// Initialize MSW
initialize()

const preview = {
  parameters: {
    // your other code...
  },
  // Provide the MSW addon loader globally
  loaders: [mswLoader],
}

export default preview
