import { FaRegFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";

const data = [
  { icon: <FaRegFolder />, label: "Kakao" },
  { icon: <FaRegFolder />, label: "Naver" },
];

const Projects = () => {
  const navigate = useNavigate();

  return (
    <Panel>
      <ButtonWrapper>
        <GrayFullButton>Figma 불러오기</GrayFullButton>
      </ButtonWrapper>
      <PanelList
        title="PROJECTS"
        items={data}
        onItemClick={() => {
          navigate("/pages");
        }}
      />
    </Panel>
  );
};

const ButtonWrapper = styled.div`
  display: flex;
  height: 100px;
  align-items: center;
`;

const GrayFullButton = styled.button`
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-radius: 6px;
  background-color: #c3c3c3;
  color: #fff;
  font-size: 14px;
`;

export default Projects;
