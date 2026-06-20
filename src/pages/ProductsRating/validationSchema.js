import * as Yup from "yup";

export const productsRatingSchema = Yup.object().shape({
  products: Yup.array().of(
    Yup.object().shape({
      rating: Yup.number()
        .typeError("Please Give your Ratings")
        .min(1, "Please Give your Ratings"),
      review_detail: Yup.string().nullable(),
    })
  ),
});
