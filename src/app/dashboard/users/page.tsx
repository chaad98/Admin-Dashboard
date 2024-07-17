"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/user/user.module.css";
import Image from "next/image";
import Link from "next/link";
import { deleteUser, existingRunner } from "@/services/adminService";
import { logger } from "@/utils/logger";
import { formattedDate } from "@/utils/date";
import { useEffect, useState } from "react";
import Loading from "@/app/ui/dashboard/loading/loading";
import { toast } from "react-toastify";

const UsersPage = ({ searchParams }: any) => {
  const [runners, setRunners] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    fetchRunners();
  }, [q, page]);

  const fetchRunners = async () => {
    try {
      const fetchedRunners = await existingRunner(q, page);
      logger("Runners data:", fetchedRunners);
      logger("Total documents:", fetchedRunners.total);
      setRunners(fetchedRunners.data);
      setTotal(fetchedRunners.total);
    } catch (error) {
      logger("Error fetching runners:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (userId: any) => {
    try {
      setIsLoading(true);
      const response = await deleteUser(userId);
      logger("Delete runner/user response:", response.data.message);
      toast.success(response.data.message);
      setRunners(runners.filter((runner: any) => runner._id !== userId));
    } catch (error: any) {
      toast.error("Error deleting runner/user:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a user..." />
        <Link href={"/dashboard/users/add"}>
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>Email</td>
            <td>Created at</td>
            <td>Role</td>
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
            runners.map((runner: any) => (
              <tr key={runner._id}>
                <td className={styles.user}>
                  <Image
                    src={runner.profilePicture || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {runner.name}
                </td>
                <td>{runner.email}</td>
                <td>{formattedDate(runner.createdAt)}</td>
                <td>{runner.isAdmin ? "Admin" : "Runner"}</td>
                <td>{runner.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/users/${runner._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>
                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(runner._id)}
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

export default UsersPage;
