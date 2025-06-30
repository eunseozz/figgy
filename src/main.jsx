import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import GlobalPortal from "@/components/GlobalPortal";
import GlobalStyle from "@/components/styles/GlobalStyle";
import routers from "@/routes/routers";

const mountApp = () => {
  let root = document.getElementById("figgy-dashboard");

  if (!root) {
    root = document.createElement("div");
    root.id = "figgy-dashboard";
    document.body.appendChild(root);
  }

  createRoot(root).render(
    <StrictMode>
      <GlobalStyle>
        <GlobalPortal>
          <RouterProvider router={routers} />
        </GlobalPortal>
      </GlobalStyle>
    </StrictMode>,
  );
};

if (
  typeof chrome !== "undefined" &&
  chrome.runtime &&
  chrome.runtime.onMessage
) {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "TOGGLE_DASHBOARD") {
      const existing = document.getElementById("figgy-dashboard");

      if (existing) {
        existing.remove();
      } else {
        mountApp();
      }
    }
  });
} else {
  mountApp();
}
