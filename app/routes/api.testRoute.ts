import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";

export const loader: LoaderFunction = async ({ request }) => {
  console.log("It works called");
  return json("It works", {
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
  });
};
