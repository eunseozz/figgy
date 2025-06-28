import "@/index.css";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import routers from "@/routes/routers";

const root = document.getElementById("figgy-dashboard");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={routers} />
    </StrictMode>,
  );
}
