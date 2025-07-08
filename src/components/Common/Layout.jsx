import { Outlet } from "react-router-dom";

import Tooltip from "@/components/Common/Tooltip";
import OverlayHUD from "@/components/HUD/OverlayHUD";
import useOverlayShortcut from "@/hooks/useOverlayShortcut";
import useFeedbackStore from "@/stores/useFeedbackStore";

const Layout = () => {
  const tooltip = useFeedbackStore((state) => state.tooltip);

  useOverlayShortcut();

  return (
    <>
      <OverlayHUD />
      <Tooltip
        top={tooltip?.top}
        left={tooltip?.left}
        text={tooltip?.text}
      />
      <Outlet />
    </>
  );
};

export default Layout;
