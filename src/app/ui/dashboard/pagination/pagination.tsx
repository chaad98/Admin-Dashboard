"use client";

import styles from "./pagination.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = ({ count }: any) => {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const params = new URLSearchParams(
    searchParams ? searchParams.toString() : ""
  );

  const item_per_page = 3;
  const page = parseInt(searchParams?.get("page") || "1");

  const hasPrev = page > 1;
  const hasNext = page * item_per_page < count;

  const handleChangePage = (pageNumber: number) => {
    params.set("page", pageNumber.toString());
    replace(`${pathName}?${params}`);
  };

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${hasPrev ? styles.btnPrevEnabled : ""}`}
        disabled={!hasPrev}
        onClick={() => handleChangePage(page - 1)}
      >
        Previous
      </button>
      <button
        className={`${styles.button} ${hasNext ? styles.btnNextEnabled : ""}`}
        disabled={!hasNext}
        onClick={() => handleChangePage(page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
