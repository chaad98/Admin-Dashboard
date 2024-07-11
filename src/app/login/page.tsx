"use client";

import styles from "@/app/ui/login/login.module.css";
import { loginUser } from "@/services/adminService";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken, setUser } = useAuthStore();
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      logger("Response here:", response);

      if (!response) {
        toast.error("Invalid credentials");
      }

      setToken(response.token);
      setUser(response.data);
      toast.success(response.message);
      router.push("/dashboard");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.form}>
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
