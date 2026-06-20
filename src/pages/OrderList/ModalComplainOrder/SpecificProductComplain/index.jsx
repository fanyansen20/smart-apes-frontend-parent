// Mui material
import { Checkbox, FormHelperText, Grid } from "@mui/material";

// components
import LabelInput from "../../../../components/LabelInput";
import InputTextField from "../../../../components/form/InputTextField/InputTextField";

// styles
import classes from "./_SpecificProductComplain.module.scss";

// helper
import { useEffect, useReducer } from "react";

// hooks
import updateQuantityReducer from "../hooks/specificProductComplain/update-quantity-reducer";

const SpecificProductComplain = ({
  errorText,
  productItems,
  changeInput,
  specificProduct,
}) => {
  const [productItem, updateQuantity] = useReducer(
    updateQuantityReducer,
    specificProduct()
  );

  const productSelected = Object.entries(productItem)
    .filter(([_, { isChecked }]) => isChecked)
    .map(([_, { qty, sub_ref_code, purchase_order_item_id }]) => {
      return {
        purchase_order_item_id,
        qty: Number(qty),
        sub_ref_code,
      };
    });

  useEffect(() => {
    changeInput("specificProducts", productSelected);
  }, [productItem]);

  return (
    <Grid id="specific-product" role="container-modal">
      <LabelInput value="Please choose the specific product" />
      <Grid container gap="1rem">
        {productItems.map((item) => (
          <Grid
            key={item.purchaseOrderItemId}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            className={`${classes.cardProduct} ${
              productItem[item.purchaseOrderItemId]?.isChecked
                ? classes.activeCardProduct
                : ""
            }`}
          >
            <Grid item md={0.8}>
              <Checkbox
                name={item.purchaseOrderItemId}
                checked={productItem[item.purchaseOrderItemId]?.isChecked}
                onChange={(e) =>
                  updateQuantity({
                    type: "SELECT_ITEM",
                    payload: { name: e.target.name, checked: e.target.checked },
                  })
                }
                color="secondary"
              />
            </Grid>

            <Grid item md={1} container justifyContent="center">
              <img src={item.imageUrl} alt="product image" />
            </Grid>
            <Grid item md={7}>
              <p>{item.title}</p>
            </Grid>

            <Grid item md={1.6}>
              <InputTextField
                name={item.purchaseOrderItemId}
                onChange={(e) =>
                  updateQuantity({
                    type: "UPDATE_QUANTITY",
                    payload: {
                      name: e.target.name,
                      value: e.target.value,
                      qtyItem: item.qty,
                      checked: true,
                    },
                  })
                }
                onBlur={(e) =>
                  updateQuantity({
                    type: "HANDLE_BLUR",
                    payload: {
                      name: e.target.name,
                      value: e.target.value,
                      qtyItem: item.qty,
                      checked: true,
                    },
                  })
                }
                disabled={!productItem[item.purchaseOrderItemId]?.isChecked}
                value={`${productItem[item.purchaseOrderItemId]?.qty}`}
              />
            </Grid>

            {productItem[item.purchaseOrderItemId]?.errorQty ? (
              <FormHelperText>
                Cannot insert more than bought quantity
              </FormHelperText>
            ) : null}
          </Grid>
        ))}
        {errorText ? <FormHelperText>{errorText}</FormHelperText> : null}
      </Grid>
    </Grid>
  );
};

export default SpecificProductComplain;
