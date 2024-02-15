import { useState, useEffect, useCallback } from "react";
import { getUser, refreshToken } from "../../pages/Auth/api/authApi";

const USER_STORAGE_KEY = "user";
const ACCESS_TOKEN_STORAGE_KEY = "accessToken";
const REFRESH_TOKEN_STORAGE_KEY = "refreshToken";

type User = {
  email: string;
};

type AuthInfo = {
  user: User;
  accessToken: string;
  refreshToken: string;
};

const useAuth = () => {
  const [authInfo, setAuthInfo] = useState<AuthInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthentification, setIsAuthentificated] = useState<boolean>(false);

  const setAuthInfoToLocalStorage = (
    user: User,
    accessToken: string,
    refreshToken: string
  ) => {
    setAuthInfo({ user, accessToken, refreshToken });
    localStorage.clear();
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user.email));
    localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, accessToken);
    localStorage.setItem(REFRESH_TOKEN_STORAGE_KEY, refreshToken);
  };

  useEffect(() => {
    const getAuthInfoFromLocalStorage = async () => {
      if (authInfo || !isLoading || isAuthentification) return;
      const storedUser = localStorage.getItem(USER_STORAGE_KEY);
      const storedAccessToken = localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
      const storedRefreshToken = localStorage.getItem(
        REFRESH_TOKEN_STORAGE_KEY
      );

      if (storedUser && storedAccessToken && storedRefreshToken) {
        const tempAuthInfo = {
          user: { email: JSON.parse(storedUser) },
          accessToken: storedAccessToken,
          refreshToken: storedRefreshToken,
        };
        setAuthInfo(tempAuthInfo);

        try {
          const response = await getUser(storedAccessToken);
          if (response.status === 200) {
            setIsAuthentificated(true);
            setIsLoading(false);
            return;
          }
        } catch {
          // Do nothing
        }
        try {
          const response = await refreshToken(storedRefreshToken);
          if (response.status === 200) {
            setAuthInfoToLocalStorage(
              { email: tempAuthInfo.user.email },
              response.data.accessToken,
              response.data.refreshToken
            );
            setIsAuthentificated(true);
          }
        } catch {}
      }
      setIsLoading(false);
    };

    getAuthInfoFromLocalStorage();
  }, []);

  const clearAuthInfoFromLocalStorage = (path = "/") => {
    setAuthInfo(null);
    localStorage.removeItem(USER_STORAGE_KEY);
    localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    localStorage.removeItem(REFRESH_TOKEN_STORAGE_KEY);
    setIsAuthentificated(false);
    window.location.href = path;
  };

  return {
    ...authInfo,
    isLoading,
    isAuthentification,
    setAuthInfo: setAuthInfoToLocalStorage,
    clearAuthInfo: clearAuthInfoFromLocalStorage,
  };
};

export default useAuth;
