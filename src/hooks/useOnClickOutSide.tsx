import { useEffect, RefObject } from "react";

const useOnClickOutSide = (
  ref: RefObject<HTMLElement>,
  onClickOutSide: () => void,
): void => {
  useEffect(() => {
    const handleClose = (event: MouseEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      onClickOutSide();
    };

    document.addEventListener("mousedown", handleClose);

    return () => {
      document.removeEventListener("mousedown", handleClose);
    };
  }, [ref, onClickOutSide]);
};

export default useOnClickOutSide;
