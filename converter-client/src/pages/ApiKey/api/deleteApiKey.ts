import { getConfig } from "../../../utils/config";
import axios from "axios";

const { BACKEND_BASE_URL } = getConfig();

export const deleteApiKey = async (accessToken: string, id: string) => {
  return await axios.delete(`${BACKEND_BASE_URL}/sub/api-key/${id}`, {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
};
