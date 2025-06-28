import { AiOutlineSetting } from "react-icons/ai";
import { FiFileText } from "react-icons/fi";
import { IoMdArrowBack } from "react-icons/io";
import styled from "styled-components";

import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";

const data = [
  {
    icon: <FiFileText />,
    label: "Page 1",
    subItems: [
      { label: "file1.png", device: "PC", isActive: true },
      { label: "file2.png", device: "TABLET" },
      { label: "file3.png", device: "MOBILE" },
    ],
  },
  {
    icon: <FiFileText />,
    label: "Page 2",
  },
];

const Pages = () => {
  return (
    <Panel>
      <ToolBar>
        <IoMdArrowBack />
        <AiOutlineSetting />
      </ToolBar>
      <PanelList
        title="PAGES"
        items={data}
      />
    </Panel>
  );
};

const ToolBar = styled.div`
  height: 70px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    font-size: 24px;
  }
`;

export default Pages;
