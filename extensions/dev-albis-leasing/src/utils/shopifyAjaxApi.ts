type UpdateCartDataProps = {
  [itemId: number | string]: number;
};

export const getCartData = async () => {
  const cartPromise = await fetch("/cart.js", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const cartData = await cartPromise.json();
  return cartData;
};

export const clearCartData = async () => {
  const cartPromise = await fetch("/cart/clear.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const clearCartData = await cartPromise.json();
  return clearCartData;
};

export const updateCartData = async (updates: UpdateCartDataProps) => {
  const updateCartPromise = await fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updates }),
  });
  const updateCartData = await updateCartPromise.json();
  return updateCartData;
};

export const deleteCartItem = async (updates: UpdateCartDataProps) => {
  const updateCartPromise = await fetch("/cart/update.js", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ updates }),
  });
  const updateCartData = await updateCartPromise.json();
  return updateCartData;
};
