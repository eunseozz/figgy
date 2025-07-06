import { useContext } from "react";

import { PortalContext } from "@/components/Common/GlobalPortal";

const useGlobalPortal = () => useContext(PortalContext);

export default useGlobalPortal;
