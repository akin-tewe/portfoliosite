'use client';
import PageLoader from './LoadingOverlay';

import { createContext, useContext, useState } from 'react';

const LoaderContext = createContext<{
  show: () => void;
  hide: () => void;
}>({
  show: () => {},
  hide: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);

  return (
    <LoaderContext.Provider
      value={{
        show: () => setLoading(true),
        hide: () => setLoading(false),
      }}
    >
      <PageLoader loading={loading} />
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}