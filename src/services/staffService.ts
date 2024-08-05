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

export const newStaff = async (formData: FormData) => {
  try {
    const responseNewStaff = await axios.post(
      `${ADMIN_ENDPOINT}/new-user`,
      formData
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

export const updateStaffInfo = async (
  token: any,
  userId: any,
  formData: FormData
) => {
  try {
    const responseUpdateStaff = await axios.put(
      `${ADMIN_ENDPOINT}/update-user/${userId}`,
      formData,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
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
