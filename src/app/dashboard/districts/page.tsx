"use client";

import Pagination from "@/app/ui/dashboard/pagination/pagination";
import Search from "@/app/ui/dashboard/search/search";
import styles from "@/app/ui/dashboard/district/district.module.css";
import Image from "next/image";
import Link from "next/link";
import { deleteDistricts, existingDistrict } from "@/services/districtService";
import { logger } from "@/utils/logger";
import { formattedDate } from "@/utils/date";
import { useEffect, useRef, useState } from "react";
import Loading from "@/app/ui/dashboard/loading/loading";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { encodedObjectId } from "@/utils/encrypt";

const DistrictsPage = ({ searchParams }: any) => {
  const [districts, setDistricts] = useState([]);
  const [total, setTotal] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef({ q: "", page: "" });
  const router = useRouter();
  const q = searchParams?.q || "";
  const page = searchParams?.page || 1;

  useEffect(() => {
    if (hasFetched.current.q !== q || hasFetched.current.page !== page) {
      fetchStaff();
      hasFetched.current = { q, page };
    }
  }, [q, page]);

  const fetchStaff = async () => {
    try {
      const fetchedDistricts = await existingDistrict(q, page);
      logger("Districts data:", fetchedDistricts);
      logger("Total documents:", fetchedDistricts.total);
      setDistricts(fetchedDistricts.data);
      setTotal(fetchedDistricts.total);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (districtId: any) => {
    try {
      setIsLoading(true);
      const encryptedDistrictId = encodedObjectId(districtId);
      const response = await deleteDistricts(encryptedDistrictId);
      logger("Delete district response:", response.message);
      toast.success(response.message);
      setDistricts(
        districts.filter((district: any) => district._id !== districtId)
      );
      router.push("/dashboard/districts");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <Search placeholder="Search for a district..." />
        <Link href={"/dashboard/districts/add"}>
          <button className={styles.addButton}>Add new</button>
        </Link>
      </div>
      <table className={styles.table}>
        <thead>
          <tr>
            <td>Name</td>
            <td>State</td>
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
            districts.map((district: any) => (
              <tr key={district._id}>
                <td className={styles.user}>
                  <Image
                    src={district.image ? district.image : "/nodistrict.png"}
                    alt=""
                    width={40}
                    height={40}
                    className={styles.userImage}
                  />
                  {district.title}
                </td>
                <td>{district.stateName}</td>
                <td>{formattedDate(district.createdAt)}</td>
                <td>
                  <div className={styles.buttons}>
                    <Link
                      href={`/dashboard/districts/${encodedObjectId(
                        district._id
                      )}`}
                    >
                      <button className={`${styles.button} ${styles.view}`}>
                        View
                      </button>
                    </Link>

                    <button
                      className={`${styles.button} ${styles.delete}`}
                      onClick={() => handleDelete(district._id)}
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

export default DistrictsPage;
