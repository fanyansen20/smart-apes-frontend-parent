import { object, string } from "yup";

import { API } from "../../../config/api";

import { parsePhoneNumber } from "awesome-phonenumber";

const getZipCode = async (value) => {
  try {
    await API.get(`locations/zip-codes/${value}`);

    return true;
  } catch (error) {
    return false;
  }
};

const userAddressSchema = object().shape({
  addressLabel: string().required("Address Label cannot be empty").nullable(),
  recipientName: string().required("Recipient cannot be empty").nullable(),
  phoneNumber: string()
    .required("Recipient phone number cannot be empty")
    .test({
      name: "is-valid-phone-number",
      message: "Phone Number not valid",
      skipAbsent: true,
      test: (value) => {
        if (!parsePhoneNumber(`+65${value}`).valid) {
          return false;
        }
        return true;
      },
    }),
  fullAddress: string().required("Full address cannot be empty").nullable(),
  zipCode: string()
    .required("Postal Code cannot be empty")
    .test({
      name: "is-validate-zip-code",
      message: "Zip code not valid",
      skipAbsent: true,
      test: async (value) => {
        if (value.length < 6) {
          return false;
        }
        const isValidZipCode = await getZipCode(value);

        if (value.length >= 6 && !isValidZipCode) {
          return false;
        }

        return true;
      },
    }),
});

export default userAddressSchema;
