import { getConfig } from "../../../utils/config";
import axios from "axios";

const { BACKEND_BASE_URL } = getConfig();

export const createApiKey = async (
  accessToken: string,
  body: { name: string; expiresAt: string }
) => {
  return await axios.post(`${BACKEND_BASE_URL}/sub/api-key`, body, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
