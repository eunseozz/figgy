import { createMemoryRouter } from "react-router-dom";

import App from "@/App";

const routers = createMemoryRouter([
  { path: "/", element: <App /> },
  { path: "*", element: <App /> },
]);

export default routers;
