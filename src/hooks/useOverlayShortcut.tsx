import { useEffect } from "react";

import useHUDStore from "@/stores/useHUDStore";

const isTypingElement = (element: Element | null): boolean => {
  if (!element) return false;

  const tagName = element.tagName;
  const isContentEditable = (element as HTMLElement).isContentEditable ?? false;

  return tagName === "INPUT" || tagName === "TEXTAREA" || isContentEditable;
};

const useOverlayShortcut = (): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const activeElement = document.activeElement;

      if (isTypingElement(activeElement)) return;

      const key = event.key.toUpperCase();
      const { isShowOverlay, showOverlayShortcutKey, setIsShowOverlay } =
        useHUDStore.getState();

      if (key === showOverlayShortcutKey) {
        setIsShowOverlay(!isShowOverlay);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
};

export default useOverlayShortcut;
