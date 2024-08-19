import axios from "axios";
import { ADMIN_BUSINESS_CATEGORY_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

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
