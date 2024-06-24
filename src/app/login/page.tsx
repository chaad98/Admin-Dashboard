import styles from "@/app/ui/login/login.module.css";

const LoginPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Login</h1>
        <input type="email" placeholder="email" required />
        <input type="password" placeholder="Password" required />
        <button>Login</button>
      </div>
    </div>
  );
};

export default LoginPage;
