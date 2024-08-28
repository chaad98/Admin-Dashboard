import axios from "axios";
import { ADMIN_BUSINESS_CATEGORY_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const getArrayBCategory = async (token: any) => {
  try {
    const responseArrayBCategory = await axios.get(
      `${ADMIN_BUSINESS_CATEGORY_ENDPOINT}/dropdown-business-category`,
      {
        headers: {
          // Authorization: `Bearer ${token}`
        },
      }
    );
    return responseArrayBCategory.data;
  } catch (error: any) {
    logger("Error rendering business category in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const newBusinessCategory = async (formData: FormData) => {
  try {
    const responseNewBusinessCategory = await axios.post(
      `${ADMIN_BUSINESS_CATEGORY_ENDPOINT}/new-business-category`,
      formData
    );

    if (responseNewBusinessCategory) {
      logger("New business category created:", responseNewBusinessCategory);
    }

    return responseNewBusinessCategory;
  } catch (error: any) {
    logger("Error creating business category in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const existingBCategory = async (q: any, page: any) => {
  try {
    const responseBusinessCategory = await axios.get(
      `${ADMIN_BUSINESS_CATEGORY_ENDPOINT}/list-business-category`,
      {
        params: { q, page },
      }
    );

    if (!responseBusinessCategory) {
      logger("No existing business category:", responseBusinessCategory);
    }

    return responseBusinessCategory.data;
  } catch (error: any) {
    logger("Error fetching business category in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const viewBusinessCategoryInfo = async (bCategoryId: any) => {
  try {
    const responseViewBusinessCategory = await axios.get(
      `${ADMIN_BUSINESS_CATEGORY_ENDPOINT}/single-business-category`,
      {
        params: { bCategoryId },
      }
    );

    if (responseViewBusinessCategory) {
      logger("Business category info viewed:", responseViewBusinessCategory);
    }

    return responseViewBusinessCategory.data;
  } catch (error: any) {
    logger("Error viewing business category in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const updateBCategoryInfo = async (
  bCategoryId: any,
  formData: FormData
) => {
  try {
    const responseUpdatedBCategory = await axios.put(
      `${ADMIN_BUSINESS_CATEGORY_ENDPOINT}/update-business-category/${bCategoryId}`,
      formData
    );

    if (responseUpdatedBCategory) {
      logger("Business category info updated:", responseUpdatedBCategory);
    }

    return responseUpdatedBCategory;
  } catch (error: any) {
    logger("Error updating business category in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const deleteBCategory = async (bCategoryId: any) => {
  try {
    const deletedBusinessCategory = await axios.delete(
      `${ADMIN_BUSINESS_CATEGORY_ENDPOINT}/delete-business-category/${bCategoryId}`
    );

    if (!deletedBusinessCategory) {
      logger("No business category deleted:", deletedBusinessCategory);
    }

    return deletedBusinessCategory.data;
  } catch (error: any) {
    logger("Error deleting business category in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};
