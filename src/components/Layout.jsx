import { Outlet } from "react-router-dom";

import Overlay from "@/components/Overlay";
import OverlayHUD from "@/components/OverlayHUD";

const Layout = () => {
  return (
    <>
      <OverlayHUD />
      <Overlay />
      <Outlet />
    </>
  );
};

export default Layout;
