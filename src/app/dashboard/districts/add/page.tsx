"use client";

import styles from "@/app/ui/dashboard/district/addDistrict/addDistrict.module.css";
import { newDistrict } from "@/services/adminService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddDistrictPage = () => {
  const [name, setName] = useState("");
  const [state, setState] = useState("");
  const { token } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!name || !state) {
        return toast.warning(
          "Please enter district name and select state accordingly"
        );
      }

      const formData = new FormData();

      formData.append("name", name);
      formData.append("state", state);

      const response = await newDistrict(token, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/districts");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="name"
          placeholder="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select name="state" id="state">
          <option value="null" selected>
            Choose State
          </option>
        </select>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddDistrictPage;
