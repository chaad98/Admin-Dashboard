"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/b-category/businessCategory.module.css";
import Image from "next/image";
import Link from "next/link";
import { logger } from "@/utils/logger";
import { formattedDate } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/ui/dashboard/loading/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import {
  deleteBCategory,
  existingBCategory,
} from "@/services/businessCategoryService";

const BusinessCategoryPage = ({ searchParams }: any) => {
  const [bCategory, setBCategory] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef({ q: "", page: "" });
  const router = useRouter();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    if (hasFetched.current.q !== q || hasFetched.current.page !== page) {
      fetchBusinessCategory();
      hasFetched.current = { q, page };
    }
  }, [q, page]);

  const fetchBusinessCategory = async () => {
    try {
      const fetchedBCategory = await existingBCategory(q, page);
      logger("Business category data:", fetchedBCategory);
      logger("Total documents:", fetchedBCategory.total);
      setBCategory(fetchedBCategory.data);
      setTotal(fetchedBCategory.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (bCategoryId: any) => {
    try {
      setIsLoading(true);
      const response = await deleteBCategory(bCategoryId);
      logger("Delete business category response:", response.message);
      toast.success(response.message);
      setBCategory(
        bCategory.filter((category: any) => category._id !== category)
      );
      router.push("/dashboard/b-category");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a business category..." />
        <Link href={"/dashboard/b-category/add"}>
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
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
            bCategory.map((category: any) => (
              <tr key={category._id}>
                <td className={styles.user}>
                  <Image
                    src={category.image ? category.image : "/noflag.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {category.title}
                </td>
                <td>{formattedDate(category.createdAt)}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/b-category/${category._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(category._id)}
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

export default BusinessCategoryPage;
