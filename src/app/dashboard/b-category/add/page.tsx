"use client";

import styles from "@/app/ui/dashboard/state/addState/addState.module.css";
import { newBusinessCategory } from "@/services/businessCategoryService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddBusinessCategoryPage = () => {
  const [name, setName] = useState("");
  const [bCategoryImage, setBCategoryImage] = useState<File | null>(null);
  const { token } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!name) {
        return toast.warning("Please enter the business category name");
      }

      const formData = new FormData();

      formData.append("name", name);

      if (bCategoryImage) {
        formData.append("bCategoryImage", bCategoryImage);
      }

      const response = await newBusinessCategory(formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/b-category");
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
        <FileUpload
          label="Business category image"
          file={bCategoryImage}
          setFile={setBCategoryImage}
        />
        <button type="submit">Submit</button>
      </form>
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

export default AddBusinessCategoryPage;
