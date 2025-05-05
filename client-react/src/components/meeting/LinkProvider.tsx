// LinkProvider.tsx
import { useState } from "react";
import { LinkContext } from "./context";
// import { LinkContext } from "./LinkContext";

export const LinkProvider = ({ children }: { children: React.ReactNode }) => {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  return (
    <LinkContext.Provider value={{ pdfUrl, setPdfUrl }}>
      {children}
    </LinkContext.Provider>
  );
};
