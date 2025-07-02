import { useEffect } from "react";

const useOnClickOutSide = (ref, onClickOutSide) => {
  useEffect(() => {
    const handleClose = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
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
