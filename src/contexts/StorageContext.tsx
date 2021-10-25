import { createContext, ReactNode, useState } from "react";
import React from "react";
import ActiveFluxType from "../types/ActiveFluxType";

interface StorageContextData {
  loadingStatus: boolean;
  setLoadingStatus: (value: boolean) => void;
  activeFluxType: ActiveFluxType;
  setActiveFluxType: (value: ActiveFluxType) => void;
}

export const StorageContext = createContext({} as StorageContextData);

interface StorageContextProviderProps {
  children: ReactNode;
}
export default function StorageContextProvider({ children }: StorageContextProviderProps) {
  const [loadingStatus, setLoadingStatusState] = useState(false);
  const [activeFluxType, setActiveFluxTypeState] = useState<ActiveFluxType>(null);

  function setLoadingStatus(value: boolean) {
    setLoadingStatusState(value);
  }

  function setActiveFluxType(value: ActiveFluxType) {
    console.log("[StorageContextProvider]: setActiveFluxType", value);

    setActiveFluxTypeState(value);
  }

  return (
    <StorageContext.Provider
      value={{ loadingStatus, setLoadingStatus, activeFluxType, setActiveFluxType }}
    >
      {children}
    </StorageContext.Provider>
  );
}
