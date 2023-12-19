import { ReadonlyURLSearchParams } from "next/navigation";

export const parseSearchParams = (searchParams: ReadonlyURLSearchParams): Record<string, string | boolean> => {
  const result: Record<string, string | boolean> = {};

  searchParams.forEach((value, key) => {
    if (value === "true") {
      result[key] = true;
    } else if (value === "false") {
      result[key] = false;
    } else {
      result[key] = value;
    }
  });

  return result;
}