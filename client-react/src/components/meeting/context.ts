import { createContext } from "react";

type LinkContextType = {
  pdfUrl: string | null;
  setPdfUrl: (url: string | null) => void;
};

export const LinkContext = createContext<LinkContextType>({
  pdfUrl: null,
  setPdfUrl: () => {},
});
