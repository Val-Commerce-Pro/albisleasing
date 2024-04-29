import { JsonRpcErrorResponse } from "../types/albisMethods";

export function formatDecimalNumber(number: number | string) {
  const str = number.toString().replace(/[^\d]/g, "");
  const length = str.length;

  if (length === 4) {
    return str.slice(0, length - 1) + "." + str.slice(length - 1);
  } else if (length <= 3) {
    return str + ".0";
  } else {
    return str.slice(0, length - 2) + "." + str.slice(length - 2);
  }
}

export function isJsonRpcErrorResponse(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  object: any,
): object is JsonRpcErrorResponse {
  return "error" in object;
}
