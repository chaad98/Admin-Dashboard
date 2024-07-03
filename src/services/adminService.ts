import axios from "axios";
import { ADMIN_ENPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const existingRunner = async (q: any) => {
  try {
    const responseRunner = await axios.get(`${ADMIN_ENPOINT}/list-users`, {
      params: { q },
    });

    if (!responseRunner) {
      logger("No existing runner:", responseRunner);
    }

    return responseRunner.data;
  } catch (error: any) {
    logger("Error fetching runner in database:", error);
  }
};

export const existingProduct = async (q: any) => {
  try {
    const responseProduct = await axios.get(`${ADMIN_ENPOINT}/list-products`, {
      params: { q },
    });

    if (!responseProduct) {
      logger("No existing product:", responseProduct);
    }

    return responseProduct.data;
  } catch (error: any) {
    logger("Error fetching product in database:", error);
  }
};

export const deleteUser = async (userId: any) => {
  try {
    const responseDeletedUser = await axios.post(
      `${ADMIN_ENPOINT}/delete-users`,
      {
        userId,
      }
    );

    if (!responseDeletedUser) {
      logger("No existing runner:", responseDeletedUser);
    }

    return responseDeletedUser.data.data;
  } catch (error: any) {
    logger("Error deleting runner in database:", error);
    throw error;
  }
};

export const deleteProduct = async (productId: any) => {
  try {
    const responseDeletedProduct = await axios.post(
      `${ADMIN_ENPOINT}/delete-products`,
      {
        productId,
      }
    );

    if (!responseDeletedProduct) {
      logger("No existing product:", responseDeletedProduct);
    }

    return responseDeletedProduct.data.data;
  } catch (error: any) {
    logger("Error deleting product in database:", error);
    throw error;
  }
};
