"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/user/user.module.css";
import Image from "next/image";
import Link from "next/link";
import {
  deleteUser,
  existingStaff,
  viewStaffInfo,
} from "@/services/adminService";
import { logger } from "@/utils/logger";
import { formattedDate } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/ui/dashboard/loading/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuthStore from "@/store/useAuthStore";

const UsersPage = ({ searchParams }: any) => {
  const [staffs, setStaffs] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);
  const router = useRouter();
  const { token } = useAuthStore();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    if (!hasFetched.current) {
      fetchStaff();
      hasFetched.current = true;
    }
  }, [q, page]);

  const fetchStaff = async () => {
    try {
      const fetchedStaffs = await existingStaff(q, page);
      logger("Staffs data:", fetchedStaffs);
      logger("Total documents:", fetchedStaffs.total);
      setStaffs(fetchedStaffs.data);
      setTotal(fetchedStaffs.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const singleStaff = async (token: any, userId: any) => {
    try {
      const response = await viewStaffInfo(token, userId);
      logger("Staff data:", response.data);
      router.push(`/dashboard/users/${response.data._id}`);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleDelete = async (userId: any) => {
    try {
      setIsLoading(true);
      const response = await deleteUser(userId);
      logger("Delete staff/user response:", response.data.message);
      toast.success(response.data.message);
      setStaffs(staffs.filter((staff: any) => staff._id !== userId));
      router.push("/dashboard/users");
    } catch (error: any) {
      toast.error(error.message);
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
            staffs.map((staff: any) => (
              <tr key={staff._id}>
                <td className={styles.user}>
                  <Image
                    src={staff.profilePicture || "/noavatar.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {staff.name}
                </td>
                <td>{staff.email}</td>
                <td>{formattedDate(staff.createdAt)}</td>
                <td>{staff.isAdmin ? "Admin" : "Runner"}</td>
                <td>{staff.isActive ? "Active" : "Inactive"}</td>
                <td>
                  <div className={styles.buttons}>
                    <button
                      className={`${styles.button} ${styles.view}`}
                      onClick={() => singleStaff(token, staff._id)}
                    >
                      View
                    </button>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(staff._id)}
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
