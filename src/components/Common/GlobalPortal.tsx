import { createContext, useState } from "react";
import type { ReactNode } from "react";

export const PortalContext = createContext<HTMLDivElement | null>(null);

type GlobalPortalProps = {
  children: ReactNode;
};

const GlobalPortal = ({ children }: GlobalPortalProps) => {
  const [portalContainer, setPortalContext] = useState<HTMLDivElement | null>(
    null,
  );

  return (
    <PortalContext.Provider value={portalContainer}>
      {children}
      <div
        ref={(elem) => {
          if (portalContainer !== null || elem === null) return;
          setPortalContext(elem);
        }}
      />
    </PortalContext.Provider>
  );
};

export default GlobalPortal;
