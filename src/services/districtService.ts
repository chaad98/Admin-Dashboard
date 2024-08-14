import axios from "axios";
import { ADMIN_DISTRICTS_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const newDistrict = async (token: any, formData: FormData) => {
  try {
    const responseNewDistrict = await axios.post(
      `${ADMIN_DISTRICTS_ENDPOINT}/new-district`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (responseNewDistrict) {
      logger("New district added:", responseNewDistrict);
    }

    return responseNewDistrict;
  } catch (error: any) {
    logger("Error creating district in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const existingDistrict = async (q: any, page: any) => {
  try {
    const responseDistrict = await axios.get(
      `${ADMIN_DISTRICTS_ENDPOINT}/list-districts`,
      {
        params: { q, page },
      }
    );

    if (!responseDistrict) {
      logger("No existing district:", responseDistrict);
    }

    return responseDistrict.data;
  } catch (error: any) {
    logger("Error fetching district in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const viewDistrictInfo = async (token: any, districtId: any) => {
  try {
    const responseViewDistrict = await axios.get(
      `${ADMIN_DISTRICTS_ENDPOINT}/single-district`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        params: { districtId },
      }
    );

    if (responseViewDistrict) {
      logger("District info:", responseViewDistrict);
    }

    return responseViewDistrict.data;
  } catch (error: any) {
    logger("Error viewing district in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const updateDistrictInfo = async (
  token: any,
  districtId: any,
  formData: FormData
) => {
  try {
    const responseUpdateDistrict = await axios.put(
      `${ADMIN_DISTRICTS_ENDPOINT}/update-district/${districtId}`,
      formData
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );

    if (responseUpdateDistrict) {
      logger("District info updated:", responseUpdateDistrict);
    }

    return responseUpdateDistrict;
  } catch (error: any) {
    logger("Error updating district in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const deleteDistricts = async (districtId: any) => {
  try {
    const responseDeletedDistricts = await axios.delete(
      `${ADMIN_DISTRICTS_ENDPOINT}/delete-district/${districtId}`
    );

    if (!responseDeletedDistricts) {
      logger("No existing district:", responseDeletedDistricts);
    }

    return responseDeletedDistricts.data;
  } catch (error: any) {
    logger("Error deleting district in database:", error);
    throw Error(
      error.response.data.error || error.response.data.message || error.message
    );
  }
};
