import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

// Import the generated route tree
import { routeTree } from './routeTree.gen';
import { IntlProvider } from 'react-intl';
import fr from '../i18n/fr-FR.json';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

// Render the app
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const rootElement = document.getElementById('root')!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <StrictMode>
      <IntlProvider messages={fr} locale="fr">
        <Suspense fallback={<p>Loading...</p>}>
          <RouterProvider router={router} />
        </Suspense>
      </IntlProvider>
    </StrictMode>
  );
}
