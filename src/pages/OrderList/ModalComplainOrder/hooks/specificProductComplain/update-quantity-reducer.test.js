import updateQuantityReducer from "./update-quantity-reducer";

const fakeProduct = {
  "65b8653f862b6b1c738607dc": {
    qty: 3,
    sub_ref_code: "ORD-SG-20240130-0006-1",
    title: "Logitech G Pro X Superlight Wireless Gaming Mouse - red",
    isChecked: false,
  },
  "65b8653f862b6b1c738607e5": {
    qty: 3,
    sub_ref_code: "ORD-SG-20240130-0006-1",
    title: "Logitech G Pro X Superlight Wireless Gaming Mouse - blue",
    isChecked: false,
  },
};

describe("update-quantity-reducer", () => {
  it("should be product chosen", () => {
    const selectItem = updateQuantityReducer(fakeProduct, {
      type: "SELECT_ITEM",
      payload: {
        name: "65b8653f862b6b1c738607dc",
        checked: true,
      },
    });

    expect(selectItem["65b8653f862b6b1c738607dc"].isChecked).toEqual(true);
  });

  it("should be update quantity product", () => {
    const fakeResult = {
      ...fakeProduct,
      ["65b8653f862b6b1c738607dc"]: {
        ...fakeProduct["65b8653f862b6b1c738607dc"],
        errorQty: false,
        qty: 4,
      },
    };

    const updateQuantity = updateQuantityReducer(fakeProduct, {
      type: "UPDATE_QUANTITY",
      payload: {
        name: "65b8653f862b6b1c738607dc",
        value: 4,
        qtyItem: 5,
      },
    });

    expect(updateQuantity).toEqual(fakeResult);
  });

  it("should be error when max quantity input", () => {
    const fakeResult = {
      ...fakeProduct,
      ["65b8653f862b6b1c738607dc"]: {
        ...fakeProduct["65b8653f862b6b1c738607dc"],
        errorQty: true,
      },
    };

    const updateQuantity = updateQuantityReducer(fakeProduct, {
      type: "UPDATE_QUANTITY",
      payload: {
        name: "65b8653f862b6b1c738607dc",
        value: 4,
        qtyItem: 3,
      },
    });

    expect(updateQuantity).toEqual(fakeResult);
  });

  it("should be back to default quantity if input 0", () => {
    const fakeResult = {
      ...fakeProduct,
      ["65b8653f862b6b1c738607dc"]: {
        ...fakeProduct["65b8653f862b6b1c738607dc"],
        errorQty: false,
      },
    };

    const blurQuantity = updateQuantityReducer(fakeProduct, {
      type: "HANDLE_BLUR",
      payload: {
        name: "65b8653f862b6b1c738607dc",
        value: 0,
        qtyItem: 3,
      },
    });

    expect(blurQuantity).toEqual(fakeResult);
  });

  it("should be input value after loses focus", () => {
    const fakeResult = {
      ...fakeProduct,
      ["65b8653f862b6b1c738607dc"]: {
        ...fakeProduct["65b8653f862b6b1c738607dc"],
        errorQty: false,
        qty: 2,
      },
    };

    const blurQuantity = updateQuantityReducer(fakeProduct, {
      type: "HANDLE_BLUR",
      payload: {
        name: "65b8653f862b6b1c738607dc",
        value: 2,
        qtyItem: 3,
      },
    });

    expect(blurQuantity).toEqual(fakeResult);
  });
});
