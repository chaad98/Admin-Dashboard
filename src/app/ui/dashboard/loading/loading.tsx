import React from "react";
import styles from "./loading.module.css";

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="h-6 w-6 bg-gray-200 rounded-full animate-pulse mr-2"></div>
      <div className="h-6 w-6 bg-blue-200 rounded-full animate-bounce mr-2"></div>
      <div className="h-6 w-6 bg-orange-200 rounded-full animate-spin mr-2"></div>
    </div>
  );
};

export default Loading;
