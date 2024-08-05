"use client";

import Loading from "@/app/ui/dashboard/loading/loading";
import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/stores/store.module.css";
import { deleteStores, existingStore } from "@/services/storeService";
import { formattedDate } from "@/utils/date";
import { logger } from "@/utils/logger";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const StoresPage = ({ searchParams }: any) => {
  const [stores, setStores] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef({ q: "", page: "" });
  const router = useRouter();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    if (hasFetched.current.q !== q || hasFetched.current.page !== page) {
      fetchStores();
      hasFetched.current = { q, page };
    }
  }, [q, page]);

  const fetchStores = async () => {
    try {
      const fetchedStores = await existingStore(q, page);
      logger("Stores data:", fetchedStores);
      logger("Total documents:", fetchedStores.total);
      setStores(fetchedStores.data);
      setTotal(fetchedStores.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (storeId: any) => {
    try {
      setIsLoading(true);
      const response = await deleteStores(storeId);
      logger("Deleted store response:", response);
      setStores(stores.filter((store: any) => store._id !== storeId));
      router.push("/dashboard/stores");
    } catch (error: any) {
      logger("Error deleting store:", error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a store..." />
        <Link href={"/dashboard/stores/add"}>
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Shop Name</td>
            <td>Retail Code</td>
            <td>Created at</td>
            <td>Mobile Number</td>
            <td>Status</td>
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
            stores.map((store: any) => (
              <tr key={store._id}>
                <td className={styles.store}>
                  <Image
                    src={store.profilePicture || "/nostore.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.storeImage}
                  />
                  {store.name}
                </td>
                <td>{store.email}</td>
                <td>{formattedDate(store.createdAt)}</td>
                <td>{store.isAdmin ? "Admin" : "store"}</td>
                <td>{store.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/stores/${store._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(store._id)}
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

export default StoresPage;
