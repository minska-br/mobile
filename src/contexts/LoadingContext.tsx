import { createContext, ReactNode, useState } from "react";
import React from "react";

interface LoadingContextData {
  loadingStatus: boolean;
  setLoadingStatus: (value: boolean) => void;
}

export const LoadingContext = createContext({} as LoadingContextData);

interface LoadingContextProviderProps {
  children: ReactNode;
}
export default function LoadingContextProvider({
  children,
}: LoadingContextProviderProps) {
  const [loadingStatus, setLoadingStatusProvider] = useState(false);

  function setLoadingStatus(value: boolean) {
    setLoadingStatusProvider(value);
  }

  return (
    <LoadingContext.Provider value={{ loadingStatus, setLoadingStatus }}>
      {children}
    </LoadingContext.Provider>
  );
}
