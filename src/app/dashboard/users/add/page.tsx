"use client";

import styles from "@/app/ui/dashboard/user/addUser/addUser.module.css";
import { newStaff } from "@/services/adminService";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const AddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile, setMobile] = useState("");
  const [isAdmin, setIsAdmin] = useState("");
  const [isActive, setIsActive] = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!isAdmin || !isActive) {
        return toast.warning(
          "Please select both options admin and active status value"
        );
      }

      const objClient = {
        name,
        email,
        mobile,
        address,
        password,
        isAdmin,
        isActive,
      };

      const response = await newStaff(objClient);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/users");
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
        <input
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="phone"
          placeholder="phone"
          name="phone"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          required
        />
        <select
          name="isAdmin"
          id="isAdmin"
          value={isAdmin}
          onChange={(e) => setIsAdmin(e.target.value)}
        >
          <option selected>Is Admin?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <select
          name="isActive"
          id="isActive"
          value={isActive}
          onChange={(e) => setIsActive(e.target.value)}
        >
          <option selected>Is Active?</option>
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
        <textarea
          name="address"
          id="address"
          rows={16}
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddUserPage;
