"use client";

import { store } from "@/store/store";
import { WithChildren } from "@/utils/types";
import { Provider } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ClientLayout({ children }: WithChildren) {
  return (
    <Provider store={store}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={1500}
        pauseOnFocusLoss={false}
        pauseOnHover={false}
        closeOnClick
      />
    </Provider>
  );
}
