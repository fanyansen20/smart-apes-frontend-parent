import * as Yup from "yup";
import { EMAIL_REGEX } from "../../../constants/form";
import { checkEmailValidate } from "./services";

export const profileSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required!"),
  lastName: Yup.string().required("Last Name is required!"),
  email: Yup.string()
    .required("Email is Required")
    .matches(EMAIL_REGEX, "Invalid email address"),
  selectedCountry: Yup.string().required("Country is Required"),
  emailExistChecker: Yup.string()
    .nullable()
    .test("unique-email", "Email is already taken", checkEmailValidate),
});
