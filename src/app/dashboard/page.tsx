"use client";

import { useEffect, useRef } from "react";
import CardUser from "../ui/dashboard/card/cardUser";
import CardStore from "../ui/dashboard/card/cardStore";
import CardProduct from "../ui/dashboard/card/cardProduct";
import Chart from "../ui/dashboard/chart/chart";
import styles from "../ui/dashboard/dashboard.module.css";
import Rightbar from "../ui/dashboard/rightbar/rightbar";
import Transaction from "../ui/dashboard/transaction/transaction";
import { logger } from "@/utils/logger";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const DashboardPage = () => {
  const hasFetched = useRef(false);
  const { token, user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    if (!hasFetched.current) {
      logger("Token after login:", token);
      logger("User after login:", user);
      hasFetched.current = true;
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.card}>
          <CardUser />
          <CardStore />
          <CardProduct />
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
