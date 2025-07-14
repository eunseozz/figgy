import { Outlet, useParams } from "react-router-dom";

import HighlightBox from "@/components/Common/HighlightBox";
import Tooltip from "@/components/Common/Tooltip";
import ViewportSize from "@/components/Common/ViewportSize";
import OverlayHUD from "@/components/HUD/OverlayHUD";
import useOverlayShortcut from "@/hooks/useOverlayShortcut";
import useWindowWidth from "@/hooks/useWindowWidth";
import useFeedbackStore from "@/stores/useFeedbackStore";
import useProjectStore from "@/stores/useProjectStore";
import { getActivePageGroupLabel, selectedProject } from "@/utils/project";

const Layout = () => {
  const { fileKey } = useParams();
  const tooltip = useFeedbackStore((state) => state.tooltip);
  const highlight = useFeedbackStore((state) => state.highlightBox);

  const project = useProjectStore(selectedProject(fileKey));
  const windowWidth = useWindowWidth();
  const label = getActivePageGroupLabel(
    project?.activePageMap,
    project?.pages,
    windowWidth,
  );

  useOverlayShortcut();

  return (
    <>
      <OverlayHUD />
      <Tooltip {...tooltip} />
      <HighlightBox {...highlight} />
      {label && <ViewportSize label={label} />}
      <Outlet />
    </>
  );
};

export default Layout;
