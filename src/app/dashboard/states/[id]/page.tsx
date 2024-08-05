"use client";

import Loading from "@/app/ui/dashboard/loading/loading";
import styles from "@/app/ui/dashboard/state/singleState/singleState.module.css";
import { updateStatefInfo, viewStateInfo } from "@/services/stateService";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const SingleStatePage = () => {
  const [state, setState] = useState<any>(null);
  const [stateImage, setStateImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const { id }: any = useParams();
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      singleState(token, id);
      hasFetched.current = true;
    }
  }, [token, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setState((prevState: any) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!state.title) {
        toast.warning("Please make sure state name is not empty");
        return;
      }

      const formData = new FormData();
      formData.append("title", state.title);

      if (stateImage) {
        formData.append("stateImage", stateImage);
      }

      const response = await updateStatefInfo(token, id, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/states");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const singleState = async (token: any, stateId: any) => {
    try {
      setIsLoading(true);
      const response = await viewStateInfo(token, stateId);
      logger("State data:", response.data);
      setState(response.data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!state) {
    return <div className={styles.noUserContainer}>No state found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image
            src={state ? state.image : "/noavatar.png"}
            alt="State Image"
            fill
          />
        </div>
        {state.title}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="title"
            placeholder="Your state..."
            value={state.title}
            onChange={handleChange}
          />
          <FileUpload
            label="State image"
            file={stateImage}
            setFile={setStateImage}
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

export default SingleStatePage;
