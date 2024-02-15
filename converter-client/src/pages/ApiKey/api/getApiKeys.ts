import { getConfig } from "../../../utils/config";
import axios from "axios";

const { BACKEND_BASE_URL } = getConfig();

export const getApiKeys = async (accessToken: string) => {
  return await axios.get(`${BACKEND_BASE_URL}/sub/api-key`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
