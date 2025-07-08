import { createHashRouter } from "react-router-dom";

import Layout from "@/components/Common/Layout";
import Pages from "@/pages/Pages";
import Projects from "@/pages/Projects";

const routers = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Projects /> },
      { path: "pages/:fileKey", element: <Pages /> },
      { path: "*", element: <Projects /> },
    ],
  },
]);

export default routers;
