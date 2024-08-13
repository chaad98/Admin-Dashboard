import { getArrayState } from "@/services/stateService";
import { logger } from "./logger";
import { toast } from "react-toastify";

export const arrayState = async (token: any, renderState: any) => {
  try {
    const response = await getArrayState(token);
    logger("Full response from reuse.ts file:", response);

    if (!response) {
      logger(
        "No response from server to render state from reuse.ts file:",
        response
      );
      return;
    }

    renderState(response.data);
  } catch (error: any) {
    toast.error(error.message);
  }
};
