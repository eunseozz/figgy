import { useContext } from "react";

import { PortalContext } from "@/components/GlobalPortal";

const useGlobalPortal = () => useContext(PortalContext);

export default useGlobalPortal;
