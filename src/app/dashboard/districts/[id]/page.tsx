"use client";

import Loading from "@/app/ui/dashboard/loading/loading";
import styles from "@/app/ui/dashboard/district/singleDistrict/singleDistrict.module.css";
import {
  updateDistrictInfo,
  viewDistrictInfo,
} from "@/services/districtService";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import { useDropzone } from "react-dropzone";
import { arrayState } from "@/utils/reuse";

const SingleDistrictPage = () => {
  const [districts, setDistricts] = useState<any>(null);
  const [districtImage, setDistrictImage] = useState<File | null>(null);
  const [selectedState, setSelectedState] = useState("");
  const [states, setStates] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const { id }: any = useParams();
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      singleDistrict(token, id);
      hasFetched.current = true;
    }
  }, [token, id]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "state") {
      setSelectedState(value);
    }

    setDistricts((prevDistrict: any) => ({
      ...prevDistrict,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("title", districts.title);
    formData.append("state", selectedState);

    if (districtImage) {
      formData.append("districtImage", districtImage);
    }

    const response = await updateDistrictInfo(token, id, formData);

    if (response.status === 200) {
      toast.success(response.data.message);
      router.push("/dashboard/districts");
    }
  };

  const singleDistrict = async (token: any, districtId: any) => {
    try {
      setIsLoading(true);
      const response = await viewDistrictInfo(token, districtId);
      logger("District data:", response.data);
      setDistricts(response.data);
      setSelectedState(response.data.stateName);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      arrayState(token, setStates);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!districts) {
    return <div className={styles.noUserContainer}>No district found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={districts.image || "/nodistrict.png"} alt="" fill />
        </div>
        {districts.title}
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Name</label>
          <input
            type="text"
            name="title"
            placeholder="District name..."
            value={districts.title}
            onChange={handleChange}
          />
          <label>State</label>
          <select
            name="state"
            id="state"
            value={selectedState}
            onChange={handleChange}
          >
            {states.map((state: { id: string; title: string }) => (
              <option key={state.id} value={state.title}>
                {state.title}
              </option>
            ))}
          </select>
          <FileUpload
            label="State image"
            file={districtImage}
            setFile={setDistrictImage}
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

export default SingleDistrictPage;
