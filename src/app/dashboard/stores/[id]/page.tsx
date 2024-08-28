"use client";

import Loading from "@/app/ui/dashboard/loading/loading";
import styles from "@/app/ui/dashboard/stores/singleStore/singleStore.module.css";
import { updateStoreInfo, viewStoreInfo } from "@/services/storeService";
import useAuthStore from "@/store/useAuthStore";
import { logger } from "@/utils/logger";
import {
  arrayBCategory,
  arrayDistrict,
  arrayLType,
  arrayState,
} from "@/utils/reuse";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const SingleStorePage = () => {
  const [stores, setStores] = useState<any>(null);
  const [states, setStates] = useState<any[]>([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState<any[]>([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [businessCategories, setBusinessCategories] = useState<any[]>([]);
  const [selectedBCategory, setSelectedBCategory] = useState("");
  const [licenseTypes, setLicenseTypes] = useState<any[]>([]);
  const [selectedLType, setSelectedLType] = useState("");
  const [companySSM, setCompanySSM] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [agreement, setAgreement] = useState<File | null>(null);
  const [businessImage, setBusinessImage] = useState<File | null>(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { token } = useAuthStore();
  const { id }: any = useParams();
  const hasFetched = useRef(false);
  const router = useRouter();

  useEffect(() => {
    if (!hasFetched.current) {
      singleStore(token, id);
      hasFetched.current = true;
    }
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;

    const handlers: { [key: string]: (value: string) => void } = {
      state: setSelectedState,
      district: setSelectedDistrict,
      businessCategory: setSelectedBCategory,
      licenseTypes: setSelectedLType,
      status: setSelectedStatus,
    };

    if (handlers[name]) {
      handlers[name](value);
    }

    setStores((prevDistrict: any) => ({
      ...prevDistrict,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();

    formData;

    const response = await updateStoreInfo(token, id, formData);

    if (response.status === 200) {
      toast.success(response.data.message);
      router.push("/dashboard/districts");
    }
  };

  const singleStore = async (token: any, storeId: any) => {
    try {
      setIsLoading(true);
      const response = await viewStoreInfo(token, storeId);
      logger("Store data:", response.data);
      setStores(response.data);
      setSelectedState(response.data.state);
      setSelectedDistrict(response.data.district);
      setSelectedBCategory(response.data.businessCategory);
      setSelectedLType(response.data.licenseType);
      setSelectedStatus(response.data.status);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      arrayState(token, setStates);
      arrayDistrict(token, setDistricts);
      arrayBCategory(token, setBusinessCategories);
      arrayLType(token, setLicenseTypes);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!stores) {
    return <div className={styles.noUserContainer}>No store found</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.infoContainer}>
        <div className={styles.imgContainer}>
          <Image src={stores.businessImage || "/nostore.png"} alt="" fill />
        </div>
        Odar DaaS
      </div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>Retail Code</label>
          <input
            type="text"
            name="name"
            placeholder="Retail Code..."
            value={stores.retailCode}
            disabled
          />
          <label>Shop Name</label>
          <input
            type="text"
            name="shopName"
            placeholder="Shop Name..."
            value={stores.shopName}
            onChange={handleChange}
          />
          <label>Registered Company Name</label>
          <input
            type="text"
            name="registeredCompanyName"
            placeholder="Registered Company Name..."
            value={stores.registeredCompanyName}
            onChange={handleChange}
          />
          <label>Company Registration Number</label>
          <input
            type="text"
            name="companyRegistrationNumber"
            placeholder="Company Registration Number..."
            value={stores.companyRegistrationNumber}
            onChange={handleChange}
          />
          <label>Address 1</label>
          <textarea
            name="address1"
            id="address1"
            placeholder="Address 1..."
            value={stores.address1}
            onChange={handleChange}
          />
          <label>Address 2</label>
          <textarea
            name="address2"
            id="address2"
            placeholder="Address 2..."
            value={stores.address2}
            onChange={handleChange}
          />
          <label>Choose State</label>
          <select
            name="state"
            id="state"
            value={selectedState}
            onChange={handleChange}
          >
            {states.map((state) => (
              <option key={state.id} value={state.title}>
                {state.title}
              </option>
            ))}
          </select>
          <label>District</label>
          <select
            name="district"
            id="district"
            value={selectedDistrict}
            onChange={handleChange}
          >
            {districts.map((district) => (
              <option key={district.id} value={district.title}>
                {district.title}
              </option>
            ))}
          </select>
          <label>Postcode</label>
          <input
            type="postcode"
            name="postcode"
            placeholder="Postcode..."
            value={stores.postcode}
            onChange={handleChange}
          />
          <label>City</label>
          <input
            type="city"
            name="city"
            placeholder="City..."
            value={stores.city}
            onChange={handleChange}
          />
          <label>Google Map Link</label>
          <input
            type="url"
            name="googleMapLink"
            placeholder="Google Map Link..."
            value={stores.googleMapLink}
            onChange={handleChange}
          />
          <label>Shop Phone Number</label>
          <input
            type="text"
            name="shopPhoneNumber"
            placeholder="Shop Phone Number..."
            value={stores.shopPhoneNumber}
            onChange={handleChange}
          />
          <label>Shop Email</label>
          <input
            type="email"
            name="shopEmail"
            placeholder="Shop Email..."
            value={stores.shopEmail}
            onChange={handleChange}
          />
          <label>Business Category</label>
          <select
            name="businessCategories"
            id="businessCategories"
            value={selectedBCategory}
            onChange={handleChange}
          >
            {businessCategories.map((bCategory) => (
              <option key={bCategory.id} value={bCategory.title}>
                {bCategory.title}
              </option>
            ))}
          </select>
          <label>License Type</label>
          <select
            name="licenseTypes"
            id="licenseTypes"
            value={selectedLType}
            onChange={handleChange}
          >
            {licenseTypes.map((lType) => (
              <option key={lType.id} value={lType.title}>
                {lType.title}
              </option>
            ))}
          </select>
          <FileUpload
            label="Company SSM"
            file={companySSM}
            setFile={setCompanySSM}
          />
          <FileUpload
            label="Business License"
            file={businessLicense}
            setFile={setBusinessLicense}
          />
          <FileUpload
            label="Agreement"
            file={agreement}
            setFile={setAgreement}
          />
          <FileUpload
            label="Business Image"
            file={businessImage}
            setFile={setBusinessImage}
          />
          <label>Status</label>
          <select
            name="status"
            id="status"
            value={selectedStatus}
            onChange={handleChange}
          >
            <option>Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="GRN">GRN</option>
            <option value="Renovation">Renovation</option>
            <option value="Temporary Closed">Temporary Closed</option>
            <option value="Moving Out">Moving Out</option>
          </select>
          <label>Route</label>
          <input
            type="text"
            name="route"
            placeholder="Shop Route..."
            value={stores.route}
            onChange={handleChange}
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

export default SingleStorePage;
