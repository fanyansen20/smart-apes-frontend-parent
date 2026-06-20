import { API, refreshTokenUrl } from "./api";

export const renewToken = async (refreshToken) => {
  const response = await API.post(refreshTokenUrl, {
    refresh_token: refreshToken,
  });

  const newAccessToken = response?.data?.access?.token;
  const newRefreshToken = response?.data?.refresh?.token;

  return [newAccessToken, newRefreshToken];
};
