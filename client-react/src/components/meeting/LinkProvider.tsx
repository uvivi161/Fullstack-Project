// LinkProvider.tsx
import { useState } from "react";
import { LinkContext } from "./context";

export const LinkProvider = ({ children }: { children: React.ReactNode }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <LinkContext.Provider value={{ pdfUrl, setPdfUrl }}>
      {children}
    </LinkContext.Provider>
  );
};
