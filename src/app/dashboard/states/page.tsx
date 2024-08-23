"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/state/state.module.css";
import Image from "next/image";
import Link from "next/link";
import { deleteStates, existingState } from "@/services/stateService";
import { logger } from "@/utils/logger";
import { formattedDate } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/ui/dashboard/loading/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { encodedObjectId } from "@/utils/encrypt";

const StatesPage = ({ searchParams }: any) => {
  const [states, setStates] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef({ q: "", page: "" });
  const router = useRouter();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    if (hasFetched.current.q !== q || hasFetched.current.page !== page) {
      fetchState();
      hasFetched.current = { q, page };
    }
  }, [q, page]);

  const fetchState = async () => {
    try {
      const fetchedStates = await existingState(q, page);
      logger("States data:", fetchedStates);
      logger("Total documents:", fetchedStates.total);
      setStates(fetchedStates.data);
      setTotal(fetchedStates.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (stateId: any) => {
    try {
      setIsLoading(true);
      const encryptedStateId = encodedObjectId(stateId);
      const response = await deleteStates(encryptedStateId);
      logger("Delete state response:", response.message);
      toast.success(response.message);
      setStates(states.filter((state: any) => state._id !== stateId));
      router.push("/dashboard/states");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a state..." />
        <Link href={"/dashboard/states/add"}>
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Total Districts</td>
            <td>Created at</td>
            <td>Action</td>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={6} className="text-center">
                <Loading />
              </td>
            </tr>
          ) : (
            states.map((state: any) => (
              <tr key={state._id}>
                <td className={styles.user}>
                  <Image
                    src={state.image ? state.image : "/noflag.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {state.title}
                </td>
                <td>{state.districts ? state.districts.length : 0}</td>
                <td>{formattedDate(state.createdAt)}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link
                      href={`/dashboard/states/${encodedObjectId(state._id)}`}
                    >
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(state._id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <Pagination count={total} />
    </div>
  );
};

export default StatesPage;
