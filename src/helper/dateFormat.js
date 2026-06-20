// helper
import { format, parseISO } from "date-fns";

/**
 * @param {{
 * value : string
 * formatting : string
 *
 * }} props
 * @returns
 */

export function dateFormatter({
  date = "2000-12-31T17:00:00.000Z",
  formatting = "d MMMM yyyy",
} = {}) {
  return format(parseISO(date), formatting);
}
