import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Overlay from "@/components/Overlay";
import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useFigmaFrames from "@/hooks/useFigmaFrames";

const Pages = () => {
  const navigate = useNavigate();
  const pages = useFigmaFrames();

  const [isShowOverlay, setIsShowOverlay] = useState(false);
  const [overlayImageUrl, setOverlayImageUrl] = useState("");

  return (
    <>
      <Panel>
        <ToolBar>
          <IconButton
            onClick={() => {
              navigate("/");
            }}
          >
            <IoMdArrowBack />
          </IconButton>
          <IconButton>
            <AiOutlineSetting />
          </IconButton>
        </ToolBar>
        <PanelList
          title="PAGES"
          items={pages}
          onItemClick={(item) => {
            setIsShowOverlay(true);
            setOverlayImageUrl(item.imageUrl);
          }}
        />
      </Panel>
      {isShowOverlay && <Overlay imageUrl={overlayImageUrl} />}
    </>
  );
};

const ToolBar = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const IconButton = styled.button`
  cursor: pointer;
  background-color: transparent;

  svg {
    font-size: 24px;
  }
`;

export default Pages;
