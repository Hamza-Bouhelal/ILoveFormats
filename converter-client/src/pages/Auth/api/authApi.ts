import { getConfig } from "../../../utils/config";
import axios from "axios";

const { BACKEND_BASE_URL } = getConfig();
const API_URL = `${BACKEND_BASE_URL}/user`;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export const apiLogin = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/login`, {
    email,
    password,
  });
  return response;
};

export const apiRegister = async (email: string, password: string) => {
  const response = await axios.post(`${API_URL}/signup`, {
    email,
    password,
  });
  return response;
};

export const getUser = async (accessToken: string) => {
  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};

export const refreshToken = async (refreshToken: string) => {
  const response = await axios.post(`${API_URL}/refresh-token`, {
    refreshToken,
  });
  return response;
};

export const logout = async (accessToken: string) => {
  const response = await axios.get(`${API_URL}/logout`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return response;
};
