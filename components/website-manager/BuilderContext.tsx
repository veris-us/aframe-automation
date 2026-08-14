"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import type { DemoContent } from "@/components/builder/types";

type BuilderContextType = {
  content: DemoContent;
  setContent: React.Dispatch<React.SetStateAction<DemoContent>>;
  updateContent: <K extends keyof DemoContent>(
    field: K,
    value: DemoContent[K]
  ) => void;
};

const BuilderContext = createContext<BuilderContextType | null>(null);

export function BuilderProvider({
  children,
  initialContent,
}: {
  children: ReactNode;
  initialContent: DemoContent;
}) {
  const [content, setContent] = useState(initialContent);

  function updateContent<K extends keyof DemoContent>(
    field: K,
    value: DemoContent[K]
  ) {
    setContent((current) => ({
      ...current,
      [field]: value,
    }));
  }

  return (
    <BuilderContext.Provider value={{ content, setContent, updateContent }}>
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);

  if (!context) {
    throw new Error("useBuilder must be used inside BuilderProvider");
  }

  return context;
}