import styles from "./footer.module.css";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>Odar DaaS</div>
      <div className={styles.trademark}>© 2024 All rights reserved.</div>
    </div>
  );
};

export default Footer;
