import { store } from "../../../config/store";
import { API_FETCH_STATUS } from "../../../constants/api";
import {
  fetchEmailCheck,
  resetStatus as resetStatusCheckEmail,
} from "../../../store/checkEmail/checkEmailSlice";

export const checkEmailValidate = async (value) => {
  const { checkEmail } = store.getState();
  const { status, message, currentEmail, initEmail } = checkEmail;
  const allowedFetch = [API_FETCH_STATUS.IS_IDLE, API_FETCH_STATUS.IS_FAILED];

  if (value === initEmail) return true;

  if (currentEmail.includes(value) && message) return false;

  if (value && allowedFetch.includes(status)) {
    const fetchEmail = new Promise((resolve) => {
      store.dispatch(fetchEmailCheck({ email: value })).then((result) => {
        if (typeof result?.payload === "boolean")
          store.dispatch(resetStatusCheckEmail());
        resolve(result);
      });
    });
    const { payload, error } = await fetchEmail;

    if (error?.message) return true;

    return !payload;
  }

  return true;
};
