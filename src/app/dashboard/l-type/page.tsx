"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/license/license.module.css";
import Image from "next/image";
import Link from "next/link";
import { logger } from "@/utils/logger";
import { formattedDate } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/ui/dashboard/loading/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { deleteLType, existingLType } from "@/services/licenseTypeService";

const LicenseTypePage = ({ searchParams }: any) => {
  const [lType, setLType] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef({ q: "", page: "" });
  const router = useRouter();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    if (hasFetched.current.q !== q || hasFetched.current.page !== page) {
      fetchLicenseType();
      hasFetched.current = { q, page };
    }
  }, [q, page]);

  const fetchLicenseType = async () => {
    try {
      const fetchedLType = await existingLType(q, page);
      logger("License type data:", fetchedLType);
      logger("Total documents:", fetchedLType.total);
      setLType(fetchedLType.data);
      setTotal(fetchedLType.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (lTypeId: any) => {
    try {
      setIsLoading(true);
      const response = await deleteLType(lTypeId);
      logger("Delete license type response:", response.message);
      toast.success(response.message);
      setLType(lType.filter((license: any) => license._id !== lTypeId));
      router.push("/dashboard/l-type");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a license type..." />
        <Link href={"/dashboard/l-type/add"}>
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
            lType.map((license: any) => (
              <tr key={license._id}>
                <td className={styles.user}>
                  <Image
                    src={license.image ? license.image : "/noflag.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {license.title}
                </td>
                <td>{formattedDate(license.createdAt)}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link href={`/dashboard/l-type/${license._id}`}>
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(license._id)}
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

export default LicenseTypePage;
