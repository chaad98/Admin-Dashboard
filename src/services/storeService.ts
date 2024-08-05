import axios from "axios";
import { ADMIN_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const newStore = async (token: any, formData: FormData) => {
  try {
    const responseNewStore = await axios.post(
      `${ADMIN_ENDPOINT}/new-store`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (responseNewStore) {
      logger("New store added:", responseNewStore);
    }

    return responseNewStore;
  } catch (error: any) {
    logger("Error creating store in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const fetchLatestRetailCode = async () => {
  try {
    const responseRetailCode = await axios.get(`${ADMIN_ENDPOINT}/retail-code`);

    if (responseRetailCode) {
      logger("Latest retail code fetched:", responseRetailCode);
    }

    return responseRetailCode.data;
  } catch (error: any) {
    logger("Error fetching latest retail code:", error);
    throw Error(
      error.response.data.error || error.response.data.message || error.message
    );
  }
};

export const existingStore = async (q: any, page: any) => {
  try {
    const responseStore = await axios.get(`${ADMIN_ENDPOINT}/list-stores`, {
      params: { q, page },
    });

    if (responseStore) {
      logger("Store information from database:", responseStore);
    }

    return responseStore.data;
  } catch (error: any) {
    logger("Error fetching store in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const deleteStores = async (storeId: any) => {
  try {
    const responseDeletedStores = await axios.delete(
      `${ADMIN_ENDPOINT}/delete-stores/${storeId}`
    );

    if (!responseDeletedStores) {
      logger("No existing stores:", responseDeletedStores);
    }

    return responseDeletedStores.data.data;
  } catch (error: any) {
    logger("Error deleting product in database:", error);
    throw Error(
      error.response.data.error || error.response.data.message || error.message
    );
  }
};
