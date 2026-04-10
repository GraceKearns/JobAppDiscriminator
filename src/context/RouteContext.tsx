'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

interface RouteContextType {
  currentRoute: string;
  setCurrentRoute: (route: string) => void;
}

const RouteContext = createContext<RouteContextType | undefined>(undefined);

export function RouteProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [currentRoute, setCurrentRoute] = useState<string>('');

  useEffect(() => {
    setCurrentRoute(pathname);
  }, [pathname]);

  return (
    <RouteContext.Provider value={{ currentRoute,setCurrentRoute }}>
      {children}
    </RouteContext.Provider>
  );
}

export function useRoute() {
  const context = useContext(RouteContext);
  if (!context) {
    throw new Error('useRoute must be used within RouteProvider');
  }
  return context;
}
