import { useParams } from "react-router-dom";

import EmptyDropHint from "@/components/EmptyDropHint";
import Overlay from "@/components/Overlay";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useDragAndDropPages from "@/hooks/useDragAndDropPages";
import useFigmaImagePages from "@/hooks/useFigmaImagePages";
import useInitPageGroups from "@/hooks/useInitPageGroups";
import useOverlayManager from "@/hooks/useOverlayManager";
import useProjectStore, { selectedProject } from "@/stores/useProjectStore";

const Pages = () => {
  const { fileKey } = useParams();

  const project = useProjectStore(selectedProject(fileKey));
  const pages = useFigmaImagePages(fileKey);

  useInitPageGroups(pages);

  const { handleDragStart, handleDrop } = useDragAndDropPages();
  const { isShowOverlay, handleItemClick, selectedPages, getOverlayImageUrl } =
    useOverlayManager();

  if (!project) return null;

  return (
    <>
      <Panel
        isShowToolBar={true}
        primaryButton={{
          label: "폴더 추가하기",
          onClick: () => console.log("폴더 추가"),
        }}
      >
        {project.pages.map((group) => {
          const selectedId = selectedPages[group.minWidth]?.id ?? null;
          const markedItems = group.items.map((item) => ({
            ...item,
            isActive: item.id === selectedId,
          }));

          return (
            <PanelList
              key={group.title}
              title={group.title}
              items={markedItems}
              onItemClick={handleItemClick}
              isToggle={true}
              onDragStart={handleDragStart}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, group.minWidth)}
              emptyHint={
                <EmptyDropHint text="프레임을 끌어다 놓으면 여기에 추가돼요" />
              }
            />
          );
        })}
      </Panel>

      {isShowOverlay && <Overlay imageUrl={getOverlayImageUrl()} />}
    </>
  );
};

export default Pages;
