import axios from "axios";
import { ADMIN_ENPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const existingRunner = async () => {
  try {
    const responseRunner = await axios.get(`${ADMIN_ENPOINT}/list-users`);

    if (!responseRunner) {
      logger("No existing runner:", responseRunner);
    }

    return responseRunner.data;
  } catch (error: any) {
    logger("Error fetching runner in database:", error);
  }
};

export const deleteUser = async () => {
  try {
    const responseDeletedUser = await axios.post(
      `${ADMIN_ENPOINT}/delete-users`
    );

    if (!responseDeletedUser) {
      logger("No existing runner:", responseDeletedUser);
    }

    return responseDeletedUser.data;
  } catch (error: any) {
    logger("Error fetching runner in database:", error);
  }
};
