import axios from "axios";
import { ADMIN_STORES_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const newStore = async (token: any, formData: FormData) => {
  try {
    const responseNewStore = await axios.post(
      `${ADMIN_STORES_ENDPOINT}/new-store`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
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
    const responseRetailCode = await axios.get(
      `${ADMIN_STORES_ENDPOINT}/retail-code`
    );

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
    const responseStore = await axios.get(
      `${ADMIN_STORES_ENDPOINT}/list-stores`,
      {
        params: { q, page },
      }
    );

    if (responseStore) {
      logger("Store information from database:", responseStore);
    }

    return responseStore.data;
  } catch (error: any) {
    logger("Error fetching store in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const viewStoreInfo = async (token: any, storeId: any) => {
  try {
    const responseViewStore = await axios.get(
      `${ADMIN_STORES_ENDPOINT}/single-store`,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
        params: { storeId },
      }
    );

    if (responseViewStore) {
      logger("Store info:", responseViewStore);
    }

    return responseViewStore.data;
  } catch (error: any) {
    logger("Error viewing store in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const updateStoreInfo = async (
  token: any,
  storeId: any,
  formData: FormData
) => {
  try {
    const responseUpdateStore = await axios.put(
      `${ADMIN_STORES_ENDPOINT}/update-store/${storeId}`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (responseUpdateStore) {
      logger("Store info updated:", responseUpdateStore);
    }

    return responseUpdateStore;
  } catch (error: any) {
    logger("Error updating store in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const deleteStores = async (storeId: any) => {
  try {
    const responseDeletedStores = await axios.delete(
      `${ADMIN_STORES_ENDPOINT}/delete-stores/${storeId}`
    );

    if (!responseDeletedStores) {
      logger("No existing stores:", responseDeletedStores);
    }

    return responseDeletedStores;
  } catch (error: any) {
    logger("Error deleting product in database:", error);
    throw Error(
      error.response.data.error || error.response.data.message || error.message
    );
  }
};
