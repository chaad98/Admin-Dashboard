import axios from "axios";
import { ADMIN_LICENSE_TYPE_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const getArrayLType = async (token: any) => {
  try {
    const responseArrayLType = await axios.get(
      `${ADMIN_LICENSE_TYPE_ENDPOINT}/dropdown-license-type`,
      {
        headers: {
          // Authorization: `Bearer ${token}`
        },
      }
    );
    return responseArrayLType.data;
  } catch (error: any) {
    logger("Error rendering license type in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const newLicenseType = async (formData: FormData) => {
  try {
    const responseNewLicenseType = await axios.post(
      `${ADMIN_LICENSE_TYPE_ENDPOINT}/new-license-type`,
      formData
    );

    if (responseNewLicenseType) {
      logger("New license type created:", responseNewLicenseType);
    }

    return responseNewLicenseType;
  } catch (error: any) {
    logger("Error creating license type in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const existingLType = async (q: any, page: any) => {
  try {
    const responseLicenseType = await axios.get(
      `${ADMIN_LICENSE_TYPE_ENDPOINT}/list-license-type`,
      {
        params: { q, page },
      }
    );

    if (!responseLicenseType) {
      logger("No existing license type:", responseLicenseType);
    }

    return responseLicenseType.data;
  } catch (error: any) {
    logger("Error fetching license type in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const viewLicenseTypeInfo = async (lTypeId: any) => {
  try {
    const responseViewLicenseType = await axios.get(
      `${ADMIN_LICENSE_TYPE_ENDPOINT}/single-license-type`,
      {
        params: { lTypeId },
      }
    );

    if (responseViewLicenseType) {
      logger("License type info viewed:", responseViewLicenseType);
    }

    return responseViewLicenseType.data;
  } catch (error: any) {
    logger("Error viewing license type in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const updateLTypeInfo = async (lTypeId: any, formData: FormData) => {
  try {
    const responseUpdatedLType = await axios.put(
      `${ADMIN_LICENSE_TYPE_ENDPOINT}/update-license-type/${lTypeId}`,
      formData
    );

    if (responseUpdatedLType) {
      logger("License type info updated:", responseUpdatedLType);
    }

    return responseUpdatedLType;
  } catch (error: any) {
    logger("Error updating license type in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const deleteLType = async (lTypeId: any) => {
  try {
    const deletedLicenseType = await axios.delete(
      `${ADMIN_LICENSE_TYPE_ENDPOINT}/delete-license-type/${lTypeId}`
    );

    if (!deletedLicenseType) {
      logger("No license type deleted:", deletedLicenseType);
    }

    return deletedLicenseType.data;
  } catch (error: any) {
    logger("Error deleting license type in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};
