import React from "react";
import { ToastContainer } from "react-toastify";

const ToastComponents = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      closeOnClick
      draggable
      theme="dark"
    />
  );
};

export default ToastComponents;
