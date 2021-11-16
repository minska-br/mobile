import { createContext, ReactNode, useState } from "react";
import React from "react";
import ActiveFluxType from "../types/ActiveFluxType";

interface SessionContextData {
  loadingStatus: boolean;
  setLoadingStatus: (value: boolean) => void;
  activeFluxType: ActiveFluxType;
  setActiveFluxType: (value: ActiveFluxType) => void;
}

export const SessionContext = createContext({} as SessionContextData);

interface SessionContextProviderProps {
  children: ReactNode;
}
export default function SessionContextProvider({ children }: SessionContextProviderProps) {
  const [loadingStatus, setLoadingStatusState] = useState(false);
  const [activeFluxType, setActiveFluxTypeState] = useState<ActiveFluxType>(null);

  function setLoadingStatus(value: boolean) {
    setLoadingStatusState(value);
  }

  function setActiveFluxType(value: ActiveFluxType) {
    console.log("\n[SessionContextProvider]: setActiveFluxType", value);

    setActiveFluxTypeState(value);
  }

  return (
    <SessionContext.Provider
      value={{ loadingStatus, setLoadingStatus, activeFluxType, setActiveFluxType }}
    >
      {children}
    </SessionContext.Provider>
  );
}
