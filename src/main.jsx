import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import GlobalStyle from "@/components/styles/GlobalStyle";
import routers from "@/routes/routers";

const root = document.getElementById("figgy-dashboard");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <GlobalStyle>
        <RouterProvider router={routers} />
      </GlobalStyle>
    </StrictMode>,
  );
}
