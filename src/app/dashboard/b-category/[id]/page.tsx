"use client";

import Loading from "@/app/ui/dashboard/loading/loading";
import styles from "@/app/ui/dashboard/b-category/singleBusinessCategory/singleBusinessCategory.module.css";
import {
  updateBCategoryInfo,
  viewBusinessCategoryInfo,
} from "@/services/businessCategoryService";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const SingleBusinessCategoryPage = () => {
  const [bCategory, setBCategory] = useState<any>(null);
  const [businessCategoryImage, setBusinessCategoryImage] =
    useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const { id }: any = useParams();
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      singleBCategory(token, id);
      hasFetched.current = true;
    }
  }, [token, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setBCategory((prevBCategory: any) => ({
      ...prevBCategory,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!bCategory.title) {
        toast.warning("Please make sure business category name is not empty");
        return;
      }

      const formData = new FormData();
      formData.append("title", bCategory.title);

      if (businessCategoryImage) {
        formData.append("businessCategoryImage", businessCategoryImage);
      }

      const response = await updateBCategoryInfo(id, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/b-category");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const singleBCategory = async (token: any, bCategoryId: any) => {
    try {
      setIsLoading(true);
      const response = await viewBusinessCategoryInfo(bCategoryId);
      logger("Business category data:", response.data);
      setBCategory(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!bCategory) {
    return (
      <div className={styles.noUserContainer}>No business category found</div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={bCategory.image ? bCategory.image : "/noavatar.png"}
            alt="Business category image"
            fill
          />
        </div>
        {bCategory.title}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="title"
            placeholder="Your business category..."
            value={bCategory.title}
            onChange={handleChange}
          />
          <FileUpload
            label="Business category image"
            file={businessCategoryImage}
            setFile={setBusinessCategoryImage}
          />
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

export default SingleBusinessCategoryPage;
