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

const unmountApp = () => {
  const root = document.getElementById("figgy-dashboard");

  if (root) root.remove();
};

const isChromeExtension =
  typeof chrome !== "undefined" && chrome.runtime?.onMessage;

if (isChromeExtension) {
  chrome.runtime.onMessage.addListener((msg) => {
    if (msg.type === "ENABLE_DASHBOARD") {
      mountApp();
    }

    if (msg.type === "DISABLE_DASHBOARD") {
      unmountApp();
    }
  });

  chrome.runtime.sendMessage({ type: "GET_DASHBOARD_STATE" }, (response) => {
    if (response?.isDashboardEnabled) {
      mountApp();
    }
  });
} else {
  mountApp();
}
