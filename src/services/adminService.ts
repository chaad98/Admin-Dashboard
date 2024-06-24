import axios from "axios";
import { ADMIN_ENPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const existingRunner = async () => {
  try {
    const responseRunner = await axios.get(`${ADMIN_ENPOINT}/list-users`);

    if (!responseRunner) {
      logger("No existing runner!");
    }

    return responseRunner.data;
  } catch (error: any) {
    logger("Error fetching runner in database:", error);
  }
};
