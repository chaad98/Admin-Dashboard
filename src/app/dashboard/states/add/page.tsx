"use client";

import styles from "@/app/ui/dashboard/state/addState/addState.module.css";
import { newState } from "@/services/adminService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddStatePage = () => {
  const [name, setName] = useState("");
  const [stateImage, setStateImage] = useState<File | null>(null);
  const { token } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!name) {
        return toast.warning("Please enter the state name");
      }

      const formData = new FormData();

      formData.append("name", name);

      const response = await newState(token, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/states");
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
          label="State image"
          file={stateImage}
          setFile={setStateImage}
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

export default AddStatePage;
