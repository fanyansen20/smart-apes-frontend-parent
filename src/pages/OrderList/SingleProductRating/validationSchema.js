import * as Yup from "yup";

export const productRatingForm = Yup.object().shape({
  rating: Yup.number()
    .typeError("Please Give your Ratings")
    .min(1, "Please Give your Ratings"),
  review_detail: Yup.string().nullable(),
});
