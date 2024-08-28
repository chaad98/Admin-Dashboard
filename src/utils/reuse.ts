import { getArrayState } from "@/services/stateService";
import { logger } from "./logger";
import { toast } from "react-toastify";
import { getArrayDistrict } from "@/services/districtService";
import { getArrayBCategory } from "@/services/businessCategoryService";
import { getArrayLType } from "@/services/licenseTypeService";

export const arrayState = async (token: any, renderState: any) => {
  try {
    const response = await getArrayState(token);
    logger("Full response state from reuse.ts file:", response);

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

export const arrayDistrict = async (token: any, renderDistrict: any) => {
  try {
    const response = await getArrayDistrict(token);
    logger("Full response district from reuse.ts file:", response);

    if (!response) {
      logger(
        "No response from server to render district from reuse.ts file:",
        response
      );
      return;
    }
    renderDistrict(response.data);
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const arrayBCategory = async (token: any, renderBCategory: any) => {
  try {
    const response = await getArrayBCategory(token);
    logger("Full response business category from reuse.ts file:", response);

    if (!response) {
      logger(
        "No response from server to render business category from reuse.ts file:",
        response
      );
      return;
    }
    renderBCategory(response.data);
  } catch (error: any) {
    toast.error(error.message);
  }
};

export const arrayLType = async (token: any, renderLType: any) => {
  try {
    const response = await getArrayLType(token);
    logger("Full response license type from reuse.ts file:", response);

    if (!response) {
      logger(
        "No response from server to render license type from reuse.ts file:",
        response
      );
      return;
    }
    renderLType(response.data);
  } catch (error: any) {
    toast.error(error.message);
  }
};
