"use client";

import styles from "@/app/ui/dashboard/district/addDistrict/addDistrict.module.css";
import { newDistrict } from "@/services/districtService";
import { getArrayState } from "@/services/stateService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddDistrictPage = () => {
  const [name, setName] = useState("");
  const [states, setStates] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [districtImage, setDistrictImage] = useState<File | null>(null);
  const { token } = useAuthStore();
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      arrayStates(token);
      hasFetched.current = true;
    }
  }, []);

  const arrayStates = async (token: any) => {
    try {
      const states = await getArrayState(token);
      setStates(states.data);
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();

      formData.append("name", name);
      formData.append("state", selectedState);

      if (districtImage) {
        formData.append("districtImage", districtImage);
      }

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
        <select
          name="state"
          id="state"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="" selected>
            Choose State
          </option>
          {states.map((state: { _id: string; title: string }) => (
            <option key={state._id} value={state.title}>
              {state.title}
            </option>
          ))}
        </select>
        <FileUpload
          label="State image"
          file={districtImage}
          setFile={setDistrictImage}
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

export default AddDistrictPage;
