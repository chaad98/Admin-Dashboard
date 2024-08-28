import axios from "axios";
import { ADMIN_STATES_ENDPOINT } from "@/utils/api";
import { logger } from "@/utils/logger";

export const getArrayState = async (token: any) => {
  try {
    const responseArrayState = await axios.get(
      `${ADMIN_STATES_ENDPOINT}/dropdown-states`,
      {
        headers: {
          // Authorization: `Bearer ${token}`
        },
      }
    );
    return responseArrayState.data;
  } catch (error: any) {
    logger("Error rendering state in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const newState = async (token: any, formData: FormData) => {
  try {
    const responseNewState = await axios.post(
      `${ADMIN_STATES_ENDPOINT}/new-state`,
      formData,
      {
        headers: {
          // Authorization: `Bearer ${token}`,
        },
      }
    );

    if (responseNewState) {
      logger("New state added:", responseNewState);
    }

    return responseNewState;
  } catch (error: any) {
    logger("Error creating state in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const existingState = async (q: any, page: any) => {
  try {
    const responseState = await axios.get(
      `${ADMIN_STATES_ENDPOINT}/list-states`,
      {
        params: { q, page },
      }
    );

    if (!responseState) {
      logger("No existing state:", responseState);
    }

    return responseState.data;
  } catch (error: any) {
    logger("Error fetching state in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const viewStateInfo = async (token: any, stateId: any) => {
  try {
    const responseViewState = await axios.get(
      `${ADMIN_STATES_ENDPOINT}/single-state`,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
        params: { stateId },
      }
    );

    if (responseViewState) {
      logger("State info:", responseViewState);
    }

    return responseViewState.data;
  } catch (error: any) {
    logger("Error viewing state in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const updateStatefInfo = async (
  token: any,
  stateId: any,
  formData: FormData
) => {
  try {
    const responseUpdateState = await axios.put(
      `${ADMIN_STATES_ENDPOINT}/update-state/${stateId}`,
      formData,
      {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      }
    );

    if (responseUpdateState) {
      logger("Updated user data:", responseUpdateState);
    }

    return responseUpdateState;
  } catch (error: any) {
    logger("Error updating state in database:", error);
    throw Error(error.response.data.error || error.response.data.message);
  }
};

export const deleteStates = async (stateId: any) => {
  try {
    const responseDeletedStates = await axios.delete(
      `${ADMIN_STATES_ENDPOINT}/delete-states/${stateId}`
    );

    if (!responseDeletedStates) {
      logger("No existing states:", responseDeletedStates);
    }

    return responseDeletedStates.data;
  } catch (error: any) {
    logger("Error deleting state in database:", error);
    throw Error(
      error.response.data.error || error.response.data.message || error.message
    );
  }
};
