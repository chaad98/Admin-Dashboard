"use client";

import styles from "@/app/ui/dashboard/license/addLicense/addLicense.module.css";
import { newLicenseType } from "@/services/licenseTypeService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddLicenseTypePage = () => {
  const [name, setName] = useState("");
  const [lTypeImage, setLTypeImage] = useState<File | null>(null);
  const { token } = useAuthStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!name) {
        return toast.warning("Please enter the license type name");
      }

      const formData = new FormData();

      formData.append("name", name);

      if (lTypeImage) {
        formData.append("lTypeImage", lTypeImage);
      }

      const response = await newLicenseType(formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/l-type");
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
          label="License type image"
          file={lTypeImage}
          setFile={setLTypeImage}
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

export default AddLicenseTypePage;
