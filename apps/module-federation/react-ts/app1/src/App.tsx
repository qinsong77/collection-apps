import * as React from 'react';
import LocalButton from './Button';

const RemoteButton = React.lazy(() => import('app2/Button'));

const App = () => (
  <div>
    <h1>Webpack module federation</h1>
    <h2>App 1</h2>
    <React.Suspense fallback="Loading Button">
      <div>
        <LocalButton />
      </div>
      <hr />
      <RemoteButton />
    </React.Suspense>
  </div>
);

export default App;
