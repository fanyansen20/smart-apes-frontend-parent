import { array, object, string } from "yup";

const validationSchemaComplainOrder = object().shape({
  complainType: string(),
  specificProducts: array().when("complainType", {
    is: (complainType) => complainType === "ONLY_SPECIFIC_PRODUCT",
    then: (schema) =>
      schema.test({
        name: "is-not-choose-product",
        message: "Please choose product for complain!",
        skipAbsent: true,
        test: (value) => {
          if (value.length === 0) {
            return false;
          }

          return true;
        },
      }),
  }),
  complainReason: string().test({
    message: "Please Select your Reason!",
    test: (value) => {
      if (!value) return false;

      return true;
    },
  }),
  descriptionReason: string()
    .required("Please Write your Reason!")
    .test("len", "Must be exactly 250 characters", (val) => val.length <= 250),
  fileProof: object().when("complainReason", {
    is: (complainReason) => {
      switch (complainReason) {
        case "Items doesn't match description":
          return true;

        case "Items damaged":
          return true;

        case "Items damaged because of seller or courier":
          return true;

        case "Wrong package":
          return true;

        case "Others":
          return true;

        default:
          false;
      }
    },
    then: (schema) =>
      schema.shape({
        videoProof: string().test({
          message:
            "Please provide photo proof with max 2MB and video proof with max 10MB",
          test: (value, ...ctx) => {
            if (!value && !ctx[0].parent.imageProof) {
              return false;
            }

            return true;
          },
        }),
      }),
  }),
});

export default validationSchemaComplainOrder;
