import { useState } from "react";
import { FaRegFolder } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Panel from "@/components/Panel";
import PanelList from "@/components/PanelList";
import { getFileKeyFromUrl } from "@/utils/util";

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const addProject = () => {
    setProjects((prevList) => [
      ...prevList,
      {
        icon: <FaRegFolder />,
        label: "Sample",
        fileKey: getFileKeyFromUrl(
          "https://www.figma.com/design/t4NRSKbOwOB3SbCbDBjESJ/%EB%82%B4%EC%A7%80%EA%B0%91%EC%86%8D_%ED%99%98%EB%B6%88%EC%A0%91%EC%88%98?node-id=0-1&p=f&t=G2CmbqMeBaTAALFS-0",
        ),
      },
    ]);
  };

  return (
    <>
      <Panel>
        <ButtonWrapper>
          <GrayFullButton onClick={addProject}>Figma 불러오기</GrayFullButton>
        </ButtonWrapper>
        <PanelList
          title="PROJECTS"
          items={projects}
          onItemClick={(item) => {
            navigate(`/pages/${item.fileKey}`);
          }}
        />
      </Panel>
    </>
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
