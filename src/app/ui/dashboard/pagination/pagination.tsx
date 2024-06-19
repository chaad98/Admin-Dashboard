import styles from "./pagination.module.css";

const Pagination = () => {
  return (
    <div className={styles.container}>
      <button className={`${styles.button} ${styles.btnPrev}`} disabled>
        Previous
      </button>
      <button className={`${styles.button} ${styles.btnNext}`}>Next</button>
    </div>
  );
};

export default Pagination;
