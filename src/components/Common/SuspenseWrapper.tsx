import { Suspense } from "react";
import type { ReactNode } from "react";

import Spinner from "@/components/Common/Spinner";

type SuspenseWrapperProps = {
  children: ReactNode;
};

const SuspenseWrapper = ({ children }: SuspenseWrapperProps) => {
  return <Suspense fallback={<Spinner size={40} />}>{children}</Suspense>;
};

export default SuspenseWrapper;
