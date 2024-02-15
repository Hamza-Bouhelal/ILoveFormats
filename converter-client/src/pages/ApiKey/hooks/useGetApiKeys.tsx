import { useState, useEffect } from "react";
import { useAuthContext } from "../../../Common/Providers/AuthContext";
import { getApiKeys } from "../api/getApiKeys";
import { AxiosError } from "axios";

export interface IApiKey {
  id: string;
  name: string;
  key: string;
  created_at: string;
  expired_at: string;
  usage_count: number;
  isNew?: boolean;
}

export const useGetApiKeys = () => {
  const { accessToken, isAuthentification } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState<IApiKey[] | null>(null);

  useEffect(() => {
    if (!isAuthentification) return;
    const fetchData = async () => {
      try {
        setIsLoading(true);

        const response = await getApiKeys(accessToken!);
        if (response.status === 200) {
          setData(response.data);
        }
      } catch (error: AxiosError | any) {
        setError(error.response?.data?.error || "An unexpected error occurred");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [isAuthentification]);

  return { isLoading, error, data };
};
