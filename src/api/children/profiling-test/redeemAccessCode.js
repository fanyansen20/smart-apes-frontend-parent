import { API } from "../../../config/api";

/**
 *
 * @param {string} accessCode
 * @param {'Grip Learning'} providerName
 * @returns
 */
export const redeemAccessCode = async (accessCode, providerName) => {
  const payload = {
    access_code: accessCode,
    provider_name: providerName,
  };

  try {
    const res = await API.post("parent/redeem-access-code", payload);

    return res.data;
  } catch (error) {
    return {
      message: error?.response?.data?.data?.message,
      code: error?.response?.data?.code,
      status: error?.response?.data?.status,
    };
  }
};
