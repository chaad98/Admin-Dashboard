"use client";

import styles from "@/app/ui/login/login.module.css";
import { loginUser } from "@/services/staffService";
import { setUser } from "@/store/authSlice";
import { logger } from "@/utils/logger";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await loginUser(email, password);
      logger("Response here:", response);

      // I MUTE THIS LINE BELOW BECAUSE THERE MIGHT BE CHANGES IN USER TYPE/ROLE IN FUTURE
      // if (response.data.isAdmin === false) {
      //   return toast.warning("User is not an admin!");
      // }

      dispatch(setUser({ user: response.data, token: response.token }));
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
