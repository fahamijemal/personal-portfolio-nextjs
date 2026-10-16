"use client";

import { createContext, useContext, type ReactNode } from "react";
import { translations, type Language } from "./translations";

type I18nContextType = {
  language: Language;
  t: typeof translations.en;
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  return (
    <I18nContext.Provider
      value={{
        language: "en",
        t: translations.en,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider");
  }
  return context;
}
