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
    logger("Error during logout process:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const newStaff = async (objData: any) => {
  try {
    const responseNewStaff = await axios.post(
      `${ADMIN_ENDPOINT}/new-user`,
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

export const viewStaffInfo = async (token: any, userId: any) => {
  try {
    const responseViewStaff = await axios.get(`${ADMIN_ENDPOINT}/single-user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { userId },
    });

    if (responseViewStaff) {
      logger("Staff info:", responseViewStaff);
    }

    return responseViewStaff.data;
  } catch (error: any) {
    logger("Error viewing runner/staff in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const updateStaffInfo = async (token: any, objData: any) => {
  try {
    const responseUpdateStaff = await axios.put(
      `${ADMIN_ENDPOINT}/update-user`,
      objData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (responseUpdateStaff) {
      logger("Updated user data:", responseUpdateStaff);
    }

    return responseUpdateStaff;
  } catch (error: any) {
    logger("Error updating runner/staff in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const existingStaff = async (q: any, page: any) => {
  try {
    const responseStaff = await axios.get(`${ADMIN_ENDPOINT}/list-users`, {
      params: { q, page },
    });

    if (!responseStaff) {
      logger("No existing staff:", responseStaff);
    }

    return responseStaff.data;
  } catch (error: any) {
    logger("Error fetching staff in database:", error);
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

export const existingState = async (q: any, page: any) => {
  try {
    const responseState = await axios.get(`${ADMIN_ENDPOINT}/list-states`, {
      params: { q, page },
    });

    if (!responseState) {
      logger("No existing state:", responseState);
    }

    return responseState.data;
  } catch (error: any) {
    logger("Error fetching state in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const existingDistrict = async (q: any, page: any) => {
  try {
    const responseDistrict = await axios.get(
      `${ADMIN_ENDPOINT}/list-districts`,
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

export const deleteUser = async (userId: any) => {
  try {
    const responseDeletedUser = await axios.delete(
      `${ADMIN_ENDPOINT}/delete-users/${userId}`
    );

    if (responseDeletedUser) {
      logger("Deleted runner:", responseDeletedUser);
    }

    return responseDeletedUser;
  } catch (error: any) {
    logger("Error deleting runner in database:", error);
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

export const deleteStates = async (stateId: any) => {
  try {
    const responseDeletedStates = await axios.delete(
      `${ADMIN_ENDPOINT}/delete-states/${stateId}`
    );

    if (!responseDeletedStates) {
      logger("No existing states:", responseDeletedStates);
    }

    return responseDeletedStates.data.data;
  } catch (error: any) {
    logger("Error deleting state in database:", error);
    throw Error(
      error.response.data.error || error.response.data.message || error.message
    );
  }
};

export const deleteDistricts = async (districtId: any) => {
  try {
    const responseDeletedDistricts = await axios.delete(
      `${ADMIN_ENDPOINT}/delete-district/${districtId}`
    );

    if (!responseDeletedDistricts) {
      logger("No existing district:", responseDeletedDistricts);
    }

    return responseDeletedDistricts.data.data;
  } catch (error: any) {
    logger("Error deleting district in database:", error);
    throw Error(
      error.response.data.error || error.response.data.message || error.message
    );
  }
};
