import { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

import useToastStore from "@/stores/useToastStore";

const Toast = () => {
  const { message, clearToast } = useToastStore();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) return;

    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      clearToast();
    }, 2500);

    return () => clearTimeout(timer);
  }, [message, clearToast]);

  if (!visible || !message) return null;

  return <ToastContainer>{message}</ToastContainer>;
};

const slideDown = keyframes`
  0% {
    opacity: 0;
    transform: translate(-50%, -30px);
  }
  20% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  80% {
    opacity: 1;
    transform: translate(-50%, 0);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -30px);
  }
`;

const ToastContainer = styled.div`
  position: fixed;
  top: 32px;
  left: 50%;
  transform: translateX(-50%);
  background: #333;
  color: #fff;
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  z-index: 1000;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  pointer-events: none;
  opacity: 0;
  animation: ${slideDown} 2.5s ease forwards;
`;

export default Toast;
