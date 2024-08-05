import axios from "axios";
import { ADMIN_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const newProduct = async (token: any, formData: FormData) => {
  try {
    const responseNewProduct = await axios.post(
      `${ADMIN_ENDPOINT}/new-product`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (responseNewProduct) {
      logger("New product added:", responseNewProduct);
    }

    return responseNewProduct;
  } catch (error: any) {
    logger("Error creating product in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const existingProduct = async (q: any, page: any) => {
  try {
    const responseProduct = await axios.get(`${ADMIN_ENDPOINT}/list-products`, {
      params: { q, page },
    });

    if (responseProduct) {
      logger("Product information from database:", responseProduct);
    }

    return responseProduct.data;
  } catch (error: any) {
    logger("Error fetching product in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const deleteProduct = async (productId: any) => {
  try {
    const responseDeletedProduct = await axios.delete(
      `${ADMIN_ENDPOINT}/delete-products/${productId}`
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
