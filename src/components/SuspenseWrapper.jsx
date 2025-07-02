import { Suspense } from "react";

import Spinner from "@/components/Spinner";

const SuspenseWrapper = ({ children }) => {
  return <Suspense fallback={<Spinner size={40} />}>{children}</Suspense>;
};

export default SuspenseWrapper;
