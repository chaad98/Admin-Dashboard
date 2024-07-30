"use client";

import Loading from "@/app/ui/dashboard/loading/loading";
import styles from "@/app/ui/dashboard/user/singleUser/singleUser.module.css";
import { updateStaffInfo, viewStaffInfo } from "@/services/adminService";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const SingleUserPage = () => {
  const [user, setUser] = useState<any>(null);
  const [userImage, setUserImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const { id }: any = useParams();
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      singleStaff(token, id);
      hasFetched.current = true;
    }
  }, [token, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setUser((prevUser: any) => ({
      ...prevUser,
      [name]:
        name === "isAdmin" || name === "isActive" ? value === "true" : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (user.isAdmin == null || user.isActive == null) {
        toast.warning(
          "Please make sure admin and active status field are not empty"
        );
        return;
      }

      const formData = new FormData();
      formData.append("name", user.name);
      formData.append("email", user.email);
      formData.append("password", user.password);
      formData.append("mobile", user.mobile);
      formData.append("isAdmin", user.isAdmin);
      formData.append("isActive", user.isActive);
      formData.append("address", user.address);

      if (userImage) {
        formData.append("userImage", userImage);
      }

      const response = await updateStaffInfo(token, id, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/users");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const singleStaff = async (token: any, userId: any) => {
    try {
      setIsLoading(true);
      const response = await viewStaffInfo(token, userId);
      logger("Staff data:", response.data);
      setUser(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!user) {
    return <div className={styles.noUserContainer}>No user found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={user.profilePicture || "/noavatar.png"} alt="" fill />
        </div>
        Odar DaaS
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Your name..."
            value={user.name}
            onChange={handleChange}
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="Your email..."
            value={user.email}
            onChange={handleChange}
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Your password..."
            onChange={handleChange}
            required
          />
          <label>Phone</label>
          <input
            type="text"
            name="mobile"
            placeholder="Your phone number (+60123456789)..."
            value={user.mobile}
            onChange={handleChange}
          />
          <label>Address</label>
          <textarea
            name="address"
            id="address"
            placeholder="Your address (Kuala Lumpur)..."
            value={user.address}
            onChange={handleChange}
          />
          <FileUpload
            label="User's Image"
            file={userImage}
            setFile={setUserImage}
          />
          <label>Is Admin?</label>
          <select
            name="isAdmin"
            id="isAdmin"
            value={user.isAdmin ? "true" : "false"}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <label>Is Active?</label>
          <select
            name="isActive"
            id="isActive"
            value={user.isActive ? "true" : "false"}
            onChange={handleChange}
          >
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
          <button className={styles.btnUpdate}>Submit</button>
        </form>
      </div>
    </div>
  );
};

const FileUpload = ({
  label,
  file,
  setFile,
}: {
  label: string;
  file: File | null;
  setFile: (file: File) => void;
}) => {
  const handleDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [] },
    onDrop: handleDrop,
  });

  return (
    <div className={styles.fileUpload}>
      <label>{label}</label>
      <div {...getRootProps({ className: styles.dropzone })}>
        <input {...getInputProps()} />
        {file ? (
          <img
            src={URL.createObjectURL(file)}
            alt={label}
            className={styles.previewImage}
          />
        ) : (
          <p>Drag & drop an image, or click to select one</p>
        )}
      </div>
    </div>
  );
};

export default SingleUserPage;
