// helper
import { isValidPhoneNumberType } from "../../../../../helper/numberFormat";

const actionType = {
  UPDATE_QUANTITY: "UPDATE_QUANTITY",
  HANDLE_BLUR: "HANDLE_BLUR",
  HANDLE_SELECT: "SELECT_ITEM",
};

const updateQuantityReducer = (state, action) => {
  const { name, value, qtyItem, checked } = action.payload;

  switch (action.type) {
    case actionType.HANDLE_SELECT:
      return {
        ...state,
        [name]: {
          ...state[name],
          isChecked: checked,
        },
      };

    case actionType.UPDATE_QUANTITY:
      if (isValidPhoneNumberType(value) && value <= qtyItem) {
        return {
          ...state,
          [name]: {
            ...state[name],
            qty: Number(value),
            errorQty: false,
          },
        };
      } else {
        return {
          ...state,
          [name]: {
            ...state[name],
            errorQty: true,
          },
        };
      }

    case actionType.HANDLE_BLUR:
      return {
        ...state,
        [name]: {
          ...state[name],
          qty: Number(value) === 0 ? Number(qtyItem) : value,
          errorQty: false,
        },
      };

    default:
      return state;
  }
};

export default updateQuantityReducer;
