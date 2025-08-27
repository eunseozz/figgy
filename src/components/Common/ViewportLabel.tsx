import { useParams } from "react-router-dom";

import ViewportSize from "@/components/Common/ViewportSize";
import useWindowWidth from "@/hooks/useWindowWidth";
import useProjectStore from "@/stores/useProjectStore";
import { getActivePageGroupLabel, selectedProject } from "@/utils/project";
import type { Project } from "@/stores/useProjectStore";

const ViewportLabel = () => {
  const { fileKey } = useParams<{ fileKey?: string }>();
  const project = useProjectStore<Project | undefined>(
    selectedProject(fileKey),
  );
  const windowWidth = useWindowWidth();

  const label = getActivePageGroupLabel(
    project?.activePageMap,
    project?.pages,
    windowWidth,
  );

  if (!label) return null;

  return <ViewportSize label={label} />;
};

export default ViewportLabel;
