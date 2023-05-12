"use client";

import React, { ReactNode, createContext, useContext, useState } from "react";
import { MeterType } from "@/types/api";

interface MeterContextProps {
  meters: MeterType[];
  setMeters: React.Dispatch<React.SetStateAction<MeterType[]>>;
}

const MeterContext = createContext<MeterContextProps | undefined>(undefined);

export const MeterProvider = ({ children }: { children: ReactNode }) => {
  const [meters, setMeters] = useState<MeterType[]>([]);

  return (
    <MeterContext.Provider value={{ meters, setMeters }}>
      {children}
    </MeterContext.Provider>
  );
};

export const useMeters = () => {
  const context = useContext(MeterContext);
  if (context === undefined) {
    throw new Error("useMeters must be used within a MeterProvider");
  }
  return context;
};
