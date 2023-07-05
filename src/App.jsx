import React from "react";
import RouterList from "./routes";
import ToastComponents from "./components/ToastComponent/ToastComponents";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <ToastComponents />
      <RouterList />
    </>
  );
}

export default App;
