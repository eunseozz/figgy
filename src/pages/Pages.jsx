import { useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import useFigmaFrames from "@/hooks/useFigmaFrames";

const Pages = () => {
  const navigate = useNavigate();

  const pages = useFigmaFrames();
  const [overlay, setOverlay] = useState("");

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
            setOverlay(item.imageUrl);
          }}
        />
      </Panel>
      <OverlayWrapper>
        <OverlayImage src={overlay} />
      </OverlayWrapper>
    </>
  );
};

const OverlayWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
  pointer-events: none;
  display: flex;
  justify-content: center;
`;

const OverlayImage = styled.img`
  display: block;
  width: auto;
  max-width: none;
  height: auto;
  opacity: 0.3;
`;

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
