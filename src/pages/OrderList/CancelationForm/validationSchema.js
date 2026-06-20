import * as Yup from "yup";

export const cancelationFormSchema = Yup.object().shape({
  reason: Yup.string().required("Please Select your Reason!"),
  message: Yup.string().required("Please Write your Reason!"),
});
