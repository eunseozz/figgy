import { useEffect, useState } from "react";
import { AiOutlineSetting } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";

const accessToken = "figd_QNKnCZH8IkzOgT4Dy0OxsHRT_4jswn2m5Y3-ePcf";

const Pages = () => {
  const navigate = useNavigate();
  const { fileKey } = useParams();

  const [pages, setPages] = useState([]);
  const [overlay, setOverlay] = useState("");

  useEffect(() => {
    const fetchPngImages = async () => {
      const frameIds = await getFrameNodeIds(fileKey);
      const result = await getPngUrlsFromFrames(frameIds);

      setPages(
        result.map((item) => ({
          ...item,
          icon: <FiFileText />,
        })),
      );
    };

    fetchPngImages();
  }, []);

  const getFrameNodeIds = async (fileKey) => {
    const res = await fetch(`https://api.figma.com/v1/files/${fileKey}`, {
      headers: {
        "X-FIGMA-TOKEN": accessToken,
      },
    });

    const data = await res.json();

    if (!data.document || !data.document.children) {
      return [];
    }

    const frames = [];

    data.document.children.forEach((page) => {
      if (page.children) {
        page.children.forEach((node) => {
          if (node.type === "FRAME") {
            frames.push({
              id: node.id,
              name: node.name,
            });
          }
        });
      }
    });

    return frames;
  };

  const getPngUrlsFromFrames = async (frames) => {
    const ids = frames.map((frame) => frame.id);
    const idsParam = ids.map(encodeURIComponent).join(",");
    const url = `https://api.figma.com/v1/images/${fileKey}?ids=${idsParam}&format=png`;

    const res = await fetch(url, {
      headers: {
        "X-FIGMA-TOKEN": accessToken,
      },
    });

    const data = await res.json();

    if (!data.images) {
      return [];
    }

    const result = frames
      .map((frame) => ({
        label: frame.name,
        imageUrl: data.images[frame.id] || null,
      }))
      .filter((item) => item.imageUrl !== null);

    return result;
  };

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
