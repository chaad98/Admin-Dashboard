"use client";

import Loading from "@/app/ui/dashboard/loading/loading";
import styles from "@/app/ui/dashboard/license/singleLicense/singleLicense.module.css";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import {
  updateLTypeInfo,
  viewLicenseTypeInfo,
} from "@/services/licenseTypeService";

const SingleLicenseTypePage = () => {
  const [lType, setLType] = useState<any>(null);
  const [licenseTypeImage, setLicenseTypeImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const { id }: any = useParams();
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      singleLType(token, id);
      hasFetched.current = true;
    }
  }, [token, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setLType((prevLType: any) => ({
      ...prevLType,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!lType.title) {
        toast.warning("Please make sure license type name is not empty");
        return;
      }

      const formData = new FormData();
      formData.append("title", lType.title);

      if (licenseTypeImage) {
        formData.append("licenseTypeImage", licenseTypeImage);
      }

      const response = await updateLTypeInfo(id, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/l-type");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const singleLType = async (token: any, lTypeId: any) => {
    try {
      setIsLoading(true);
      const response = await viewLicenseTypeInfo(lTypeId);
      logger("License type data:", response.data);
      setLType(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!lType) {
    return <div className={styles.noUserContainer}>No license type found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={lType.image ? lType.image : "/noavatar.png"}
            alt="License type image"
            fill
          />
        </div>
        {lType.title}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="title"
            placeholder="Your license type name..."
            value={lType.title}
            onChange={handleChange}
          />
          <FileUpload
            label="License type image"
            file={licenseTypeImage}
            setFile={setLicenseTypeImage}
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

export default SingleLicenseTypePage;
