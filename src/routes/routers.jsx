import { createMemoryRouter } from "react-router-dom";

import Pages from "@/pages/Pages";
import Projects from "@/pages/Projects";

const routers = createMemoryRouter([
  { path: "/", element: <Projects /> },
  { path: "/pages/:fileKey", element: <Pages /> },
  { path: "*", element: <Projects /> },
]);

export default routers;
