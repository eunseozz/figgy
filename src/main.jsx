import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import GlobalPortal from "@/components/Common/GlobalPortal";
import GlobalStyle from "@/components/Common/GlobalStyle";
import routers from "@/routes/routers";

const queryClient = new QueryClient();

const mountApp = () => {
  let root = document.getElementById("figgy-dashboard");

  if (!root) {
    root = document.createElement("div");
    root.id = "figgy-dashboard";
    document.body.appendChild(root);
  }

  createRoot(root).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <GlobalStyle />
        <GlobalPortal>
          <RouterProvider router={routers} />
        </GlobalPortal>
      </QueryClientProvider>
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
