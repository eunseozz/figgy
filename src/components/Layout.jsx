import { Outlet } from "react-router-dom";

import OverlayHUD from "@/components/OverlayHUD";

const Layout = () => {
  return (
    <>
      <OverlayHUD />
      <Outlet />
    </>
  );
};

export default Layout;
