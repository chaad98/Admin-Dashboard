"use client";

import styles from "@/app/ui/dashboard/stores/addStore/addStore.module.css";
import { fetchLatestRetailCode, newStore } from "@/services/storeService";
import useAuthStore from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { toast } from "react-toastify";

const AddStorePage = () => {
  const [retailCode, setRetailCode] = useState("");
  const [shopName, setShopName] = useState("");
  const [registeredCompanyName, setRegisteredCompanyName] = useState("");
  const [companyRegistrationNumber, setCompanyRegistrationNumber] =
    useState("");
  const [shopAddress1, setShopAddress1] = useState("");
  const [shopAddress2, setShopAddress2] = useState("");
  const [state, setState] = useState("");
  const [district, setDistrict] = useState("");
  const [postcode, setPostcode] = useState("");
  const [city, setCity] = useState("");
  const [googleMapLink, setGoogleMapLink] = useState("");
  const [shopPhoneNumber, setShopPhoneNumber] = useState("");
  const [shopEmail, setShopEmail] = useState("");
  const [businessCategory, setBusinessCategory] = useState("");
  const [licenseType, setLicenseType] = useState("");
  const [companySSM, setCompanySSM] = useState<File | null>(null);
  const [businessLicense, setBusinessLicense] = useState<File | null>(null);
  const [agreement, setAgreement] = useState<File | null>(null);
  const [status, setStatus] = useState("");
  const [businessImage, setBusinessImage] = useState<File | null>(null);
  const [product, setProduct] = useState("");
  const router = useRouter();
  const hasFetched = useRef(false);
  const { token } = useAuthStore();

  useEffect(() => {
    if (!hasFetched.current) {
      syncRecentRetailCode();
      hasFetched.current = true;
    }
  }, []);

  const syncRecentRetailCode = async () => {
    try {
      const response = await fetchLatestRetailCode();

      let nextRetailCode = "";

      if (response) {
        const prevRetailCode = response.data;
        const lastNumber = parseInt(prevRetailCode.slice(2));
        const nextNumber = lastNumber + 1;
        nextRetailCode = `DI${nextNumber.toString().padStart(5, "0")}`;
      }

      setRetailCode(nextRetailCode);
      toast.info(response.message);
    } catch (error: any) {
      const nextRetailCode = "DI00001";
      setRetailCode(nextRetailCode);
      toast.info(error.message);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (!retailCode || !shopEmail || !shopPhoneNumber) {
        return toast.warning("Please key in all field!");
      }

      const formData = new FormData();

      formData.append("retailCode", retailCode);
      formData.append("shopName", shopName);
      formData.append("registeredCompanyName", registeredCompanyName);
      formData.append("companyRegistrationNumber", companyRegistrationNumber);
      formData.append("shopAddress1", shopAddress1);
      formData.append("shopAddress2", shopAddress2);
      formData.append("state", state);
      formData.append("district", district);
      formData.append("postcode", postcode);
      formData.append("city", city);
      formData.append("googleMapLink", googleMapLink);
      formData.append("shopPhoneNumber", shopPhoneNumber);
      formData.append("shopEmail", shopEmail);
      formData.append("businessCategory", businessCategory);
      formData.append("licenseType", licenseType);
      formData.append("status", status);
      formData.append("product", product);

      if (companySSM) formData.append("companySSM", companySSM);
      if (businessLicense) formData.append("businessLicense", businessLicense);
      if (agreement) formData.append("agreement", agreement);
      if (businessImage) formData.append("businessImage", businessImage);

      // const objClient = {
      //   retailCode,
      //   shopName,
      //   registeredCompanyName,
      //   companyRegistrationNumber,
      //   shopAddress1,
      //   shopAddress2,
      //   state,
      //   district,
      //   postcode,
      //   city,
      //   googleMapLink,
      //   shopPhoneNumber,
      //   shopEmail,
      //   businessCategory,
      //   licenseType,
      //   companySSM,
      //   businessLicense,
      //   agreement,
      //   status,
      //   businessImage,
      //   product,
      // };

      const response = await newStore(token, formData);

      if (response.status === 200) {
        toast.success(response.data.message);
        router.push("/dashboard/users");
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Retail Code"
          name="text"
          value={retailCode}
          readOnly
        />
        <input
          type="text"
          placeholder="Shop Name"
          name="text"
          value={shopName}
          onChange={(e) => setShopName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Registered Company Name"
          name="text"
          value={registeredCompanyName}
          onChange={(e) => setRegisteredCompanyName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Company Registration Number"
          name="text"
          value={companyRegistrationNumber}
          onChange={(e) => setCompanyRegistrationNumber(e.target.value)}
        />
        <textarea
          id="address1"
          rows={1}
          cols={2}
          placeholder="Address 1"
          value={shopAddress1}
          onChange={(e) => setShopAddress1(e.target.value)}
        ></textarea>
        <textarea
          id="address2"
          rows={1}
          cols={2}
          placeholder="Address 2"
          value={shopAddress2}
          onChange={(e) => setShopAddress2(e.target.value)}
        ></textarea>
        <select name="state" id="state">
          <option value="null" selected>
            Choose State
          </option>
        </select>
        <select name="district" id="district">
          <option value="null" selected>
            District
          </option>
        </select>
        <input
          type="postcode"
          placeholder="Postcode"
          name="postcode"
          pattern="^[A-Za-z0-9\s\-]{3,10}$"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
        />
        <input
          type="city"
          placeholder="City"
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <input
          type="url"
          placeholder="Google Map Link"
          name="link"
          value={googleMapLink}
          onChange={(e) => setGoogleMapLink(e.target.value)}
        />
        <input
          type="text"
          placeholder="Shop Phone Number"
          name="phone"
          value={shopPhoneNumber}
          onChange={(e) => setShopPhoneNumber(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Shop Email"
          name="email"
          value={shopEmail}
          onChange={(e) => setShopEmail(e.target.value)}
          required
        />
        <select name="category" id="category">
          <option value="null" selected>
            Business Category
          </option>
        </select>
        <select name="license" id="license">
          <option value="null" selected>
            License Type
          </option>
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
        <FileUpload label="Agreement" file={agreement} setFile={setAgreement} />
        <FileUpload
          label="Business Image"
          file={businessImage}
          setFile={setBusinessImage}
        />
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option selected>Status</option>
          <option value="true">Active</option>
          <option value="false">Inactive</option>
          <option value="false">GRN</option>
          <option value="false">Renovation</option>
          <option value="false">Temporary Closed</option>
          <option value="false">Moving Out</option>
        </select>
        <input
          type="text"
          placeholder="Route"
          name="text"
          value={shopEmail}
          onChange={(e) => setShopEmail(e.target.value)}
          required
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

export default AddStorePage;
