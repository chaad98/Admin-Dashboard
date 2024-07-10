import axios from "axios";
import { ADMIN_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const loginUser = async (email: string, password: string) => {
  try {
    const responseLogin = await axios.post(`${ADMIN_ENDPOINT}/login`, {
      email,
      password,
    });

    if (!responseLogin) {
      logger("No response from login:", responseLogin);
    }

    return responseLogin.data;
  } catch (error: any) {
    logger("Error login occurred:", error.message);
  }
};

export const existingRunner = async (q: any, page: any) => {
  try {
    const responseRunner = await axios.get(`${ADMIN_ENDPOINT}/list-users`, {
      params: { q, page },
    });

    if (!responseRunner) {
      logger("No existing runner:", responseRunner);
    }

    return responseRunner.data;
  } catch (error: any) {
    logger("Error fetching runner in database:", error);
  }
};

export const existingProduct = async (q: any, page: any) => {
  try {
    const responseProduct = await axios.get(`${ADMIN_ENDPOINT}/list-products`, {
      params: { q, page },
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
      `${ADMIN_ENDPOINT}/delete-users`,
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
      `${ADMIN_ENDPOINT}/delete-products`,
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
