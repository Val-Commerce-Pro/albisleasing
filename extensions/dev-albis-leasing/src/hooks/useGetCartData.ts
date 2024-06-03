import { useEffect, useState } from "react";
import { ZodSchema, z } from "zod";
import { ShoppingCart } from "../types/cartTypes";

const itemSchema = z.object({
  discounted_price: z.number(),
  final_price: z.number(),
  handle: z.string(),
  id: z.number(),
  image: z.string(),
  key: z.string(),
  line_price: z.number(),
  product_id: z.number(),
  product_title: z.string(),
  quantity: z.number(),
  title: z.string(),
  url: z.string(),
  variant_id: z.number(),
});

const shoppingCartSchema: ZodSchema<ShoppingCart> = z.object({
  token: z.string(),
  currency: z.string(),
  item_count: z.number(),
  total_price: z.number(),
  items: z.array(itemSchema),
});

export const useGetCartData = () => {
  const [cartData, setCartData] = useState<ShoppingCart>();

  useEffect(() => {
    fetch("/cart.js")
      .then((response) => response.json())
      .then((data) => {
        const netCartData = {
          ...data,
          total_price: Math.round(data.total_price / 1.19),
          items: data.items.map((item: any) => ({
            ...item,
            line_price: Math.round((item.line_price = item.line_price / 1.19)),
          })),
        };
        console.log("data", data, "netCartData", netCartData);
        const formattedData = shoppingCartSchema.parse(netCartData);
        setCartData(formattedData);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  return cartData;
};
