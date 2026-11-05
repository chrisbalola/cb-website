import React, { useState } from 'react';
import { useDidMount } from 'rooks';

type WithClientOptions = {
  loader?: React.ReactNode | React.FC;
  delay?: number;
};

export function WithClientSideMount<P extends object = object>(Component: React.ComponentType<P>, options?: WithClientOptions): React.FC<P> {
  const WrappedComponent: React.FC<P> = (props) => {
    const [ready, setReady] = useState(false);

    useDidMount(() => {
      if (options?.delay && options.delay > 0) {
        const id = window.setTimeout(() => setReady(true), options.delay);
        return () => window.clearTimeout(id);
      }

      setReady(true);
      // no cleanup needed when no timeout
      return undefined;
    });

    if (!ready) {
      const loader = options?.loader;
      if (loader) {
        if (typeof loader === 'function') {
          const LoaderComponent = loader as React.ComponentType<unknown>;
          return <LoaderComponent />;
        }
        return <>{loader}</>;
      }

      return null;
    }

    return <Component {...(props as P)} />;
  };

  // Assign a display name for easier debugging in React DevTools.
  WrappedComponent.displayName = `WithClientSideMount(${Component.displayName ?? Component.name})`;

  return WrappedComponent;
}
