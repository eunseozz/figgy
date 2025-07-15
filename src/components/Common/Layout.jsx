import { Outlet } from "react-router-dom";

import HighlightBox from "@/components/Common/HighlightBox";
import Tooltip from "@/components/Common/Tooltip";
import ViewportLabel from "@/components/Common/ViewportLabel";
import OverlayHUD from "@/components/HUD/OverlayHUD";
import useOverlayShortcut from "@/hooks/useOverlayShortcut";
import useFeedbackStore from "@/stores/useFeedbackStore";

const Layout = () => {
  const tooltip = useFeedbackStore((state) => state.tooltip);
  const highlight = useFeedbackStore((state) => state.highlightBox);

  useOverlayShortcut();

  return (
    <>
      <OverlayHUD />
      <Tooltip {...tooltip} />
      <HighlightBox {...highlight} />
      <ViewportLabel />
      <Outlet />
    </>
  );
};

export default Layout;
