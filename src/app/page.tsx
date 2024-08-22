"use client";

import styles from "./homepage.module.css";
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { logger } from "@/utils/logger";
import { ORIGIN_ENDPOINT } from "@/utils/api";

const HomePage = () => {
  const [data, setData] = useState<string>("Connecting to API...");
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!hasFetched.current) {
      const interval = setInterval(fetchData, 10000); // Fetch data every 10 seconds. No need for revalidation

      if (interval) {
        hasFetched.current = true;
      }

      return () => {
        hasFetched.current = false;
        clearInterval(interval);
      };
    }
  }, []);

  const fetchData = async () => {
    try {
      const responseOrigin: any = await axios.get(ORIGIN_ENDPOINT);

      if (!responseOrigin) {
        throw new Error("Error connecting to API");
      }
      setData(responseOrigin.data.success);
      logger("Message from origin route:", responseOrigin.data.success);
    } catch (error: any) {
      setData("Error connecting to API...");
      logger("Error fetching data:", error);
    }
  };

  const getTextOrigin = () => {
    if (data === "Connecting to API...") {
      return styles.loadingText;
    } else if (data === "Error connecting to API...") {
      return styles.errorText;
    } else {
      return styles.successText;
    }
  };

  return (
    <div className={styles.container}>
      <p className={getTextOrigin()}>{data}</p>
    </div>
  );
};

export default HomePage;
