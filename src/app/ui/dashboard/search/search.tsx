"use client";

import { MdSearch } from "react-icons/md";
import styles from "./search.module.css";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { logger } from "@/utils/logger";
import { useDebouncedCallback } from "use-debounce";

const Search = ({ placeholder }: any) => {
  const { replace } = useRouter();

  const searchParams = useSearchParams();
  logger("searchParams:", searchParams);

  const pathName = usePathname();
  logger("pathName:", pathName);

  const handleSearch = useDebouncedCallback((e: any) => {
    const params = new URLSearchParams(searchParams);
    logger("params:", params);

    if (e.target.value) {
      e.target.value.length >= 3 && params.set("q", e.target.value);
    } else {
      params.delete("q");
    }

    replace(`${pathName}?${params}`);
  }, 300);

  return (
    <div className={styles.container}>
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className={styles.input}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Search;
