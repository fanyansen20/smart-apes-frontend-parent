import numeral from "numeral";

export const intToSGD = (number) => `S${numeral(number).format("$0,0.00")}`;
