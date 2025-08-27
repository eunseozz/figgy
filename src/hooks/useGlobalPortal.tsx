import { useContext } from "react";

import { PortalContext } from "@/components/Common/GlobalPortal";

const useGlobalPortal = (): HTMLDivElement | null => {
  return useContext(PortalContext);
};

export default useGlobalPortal;
