import numeral from "numeral";

export function isValidPhoneNumberType(inputString) {
  const parsedInputToNumber = Number(inputString);

  if (isNaN(parsedInputToNumber)) {
    return false;
  }

  return true;
}

export const roundDiscountNumber = (discountNumber) =>
  discountNumber > 0
    ? parseInt(discountNumber)
    : numeral(discountNumber).format("0");
