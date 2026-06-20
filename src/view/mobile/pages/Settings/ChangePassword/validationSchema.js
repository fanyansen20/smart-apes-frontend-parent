import { object, string } from "yup";

export const validationSchema = object({
  currentPassword: string().required("Please insert your current password"),
  newPassword: string()
    .min(8, "Password must be at least 8 characters")
    .required("Please insert your new password")
    .test(
      "passwords-different",
      "New password couldn't be same with current password",
      function (value) {
        return this.parent.currentPassword !== value;
      }
    )
    .test(
      "contain-number",
      "Your password should contain number",
      function (value) {
        return /\d/.test(value);
      }
    ),
  confirmNewPassword: string()
    .required("Please confirm your new password")
    .test("passwords-match", "Passwords must match", function (value) {
      return this.parent.newPassword === value;
    }),
});
