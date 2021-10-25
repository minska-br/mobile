import { createContext, ReactNode, useState } from "react";
import React from "react";

interface StorageContextData {
  loadingStatus: boolean;
  setLoadingStatus: (value: boolean) => void;
}

export const StorageContext = createContext({} as StorageContextData);

interface StorageContextProviderProps {
  children: ReactNode;
}
export default function StorageContextProvider({ children }: StorageContextProviderProps) {
  const [loadingStatus, setLoadingStatusProvider] = useState(false);

  function setLoadingStatus(value: boolean) {
    setLoadingStatusProvider(value);
  }

  return (
    <StorageContext.Provider value={{ loadingStatus, setLoadingStatus }}>
      {children}
    </StorageContext.Provider>
  );
}
