import axios from "axios";
import { ADMIN_USERS_ENDPOINT, USER_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const loginUser = async (email: string, password: string) => {
  try {
    const responseLogin = await axios.post(
      `${USER_ENDPOINT}/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );

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

export const logoutUser = async () => {
  try {
    const responseLogout = await axios.delete(`${USER_ENDPOINT}/logout`, {
      withCredentials: true,
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
      `${ADMIN_USERS_ENDPOINT}/delete-users/${userId}`,
      {
        withCredentials: true,
      }
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
      `${ADMIN_USERS_ENDPOINT}/new-user`,
      formData,
      {
        withCredentials: true,
      }
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

export const viewStaffInfo = async (userId: any) => {
  try {
    const responseViewStaff = await axios.get(
      `${ADMIN_USERS_ENDPOINT}/single-user`,
      {
        params: { userId },
        withCredentials: true,
      }
    );

    if (responseViewStaff) {
      logger("Staff info:", responseViewStaff);
    }

    return responseViewStaff.data;
  } catch (error: any) {
    logger("Error viewing runner/staff in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const updateStaffInfo = async (userId: any, formData: FormData) => {
  try {
    const responseUpdateStaff = await axios.put(
      `${ADMIN_USERS_ENDPOINT}/update-user/${userId}`,
      formData,
      {
        withCredentials: true,
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
    const responseStaff = await axios.get(
      `${ADMIN_USERS_ENDPOINT}/list-users`,
      {
        withCredentials: true,
        params: { q, page },
      }
    );

    if (!responseStaff) {
      logger("No existing staff:", responseStaff);
    }

    return responseStaff.data;
  } catch (error: any) {
    logger("Error fetching staff in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};
