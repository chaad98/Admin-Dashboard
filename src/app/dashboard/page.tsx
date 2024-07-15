"use client";

import { useEffect } from "react";
import Card from "../ui/dashboard/card/card";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transaction from "../ui/dashboard/transaction/transaction";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";

const DashboardPage = () => {
  const { token, user } = useAuthStore();
  useEffect(() => {
    logger("Token after login:", token);
    logger("User after login:", user);
  }, [token, user]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.card}>
          <Card />
          <Card />
          <Card />
        </div>
        <Transaction />
        <Chart />
      </div>
      <div className={styles.side}>
        <Rightbar />
      </div>
    </div>
  );
};

export default DashboardPage;
