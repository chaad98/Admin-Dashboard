import axios from "axios";
import { ADMIN_ENDPOINT, USER_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const loginUser = async (email: string, password: string) => {
  try {
    const responseLogin = await axios.post(`${USER_ENDPOINT}/login`, {
      email,
      password,
    });

    if (!responseLogin) {
      logger("No response from login:", responseLogin);
    }

    return responseLogin.data;
  } catch (error: any) {
    logger("Error login occurred from admin service:", error);

    if (error.code === "ERR_NETWORK") {
      throw Error("Server down!");
    }

    throw Error(error.response.data.error || error.response.data.warning);
  }
};

export const logoutUser = async (token: any) => {
  try {
    const responseLogout = await axios.delete(`${USER_ENDPOINT}/logout`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return responseLogout;
  } catch (error: any) {
    logger("Error during logout process:", error.message);
    throw error;
  }
};

export const newStaff = async (objData: any) => {
  try {
    const responseNewStaff = await axios.post(
      `${ADMIN_ENDPOINT}/new-staff`,
      objData
    );

    if (responseNewStaff) {
      logger("New staff added:", responseNewStaff);
    }

    return responseNewStaff;
  } catch (error: any) {
    logger("Error creating runner/staff in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
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

export const existingStore = async (q: any, page: any) => {
  try {
    const responseStore = await axios.get(`${ADMIN_ENDPOINT}/list-stores`, {
      params: { q, page },
    });

    if (!responseStore) {
      logger("No existing store:", responseStore);
    }

    return responseStore.data;
  } catch (error: any) {
    logger("Error fetching store in database:", error);
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

export const deleteStores = async (storesId: any) => {
  try {
    const responseDeletedStores = await axios.post(
      `${ADMIN_ENDPOINT}/delete-stores`,
      {
        storesId,
      }
    );

    if (!responseDeletedStores) {
      logger("No existing stores:", responseDeletedStores);
    }

    return responseDeletedStores.data.data;
  } catch (error: any) {
    logger("Error deleting product in database:", error);
    throw error;
  }
};
