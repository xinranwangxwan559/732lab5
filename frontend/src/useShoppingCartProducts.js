import { useContext } from "react";
import { AppContext } from "./AppContextProvider";

/**
 * Uses a user's shopping cart, along with the list of products as obtained from online,
 * to build up a summary of products in the given count, grouped by item, with a count for each item.
 */
export default function useUserCartSummary() {
  // Grab the user's cart and product list from context.
  const { products, cart } = useContext(AppContext);

  return createCartSummary(products, cart);
}

/**
 * This function may be reused to create summaries from other carts. For example, in the order history page.
 */
export function createCartSummary(products, cart) {
  const productsInCart = [];

  // Each item in the cart is just a procuct id.
  cart.forEach((productId) => {
    // Attempt to find the current product id in our groups
    const group = productsInCart.find((group) => group.product._id === productId);

    // If we do, add to its count
    if (group) {
      group.count++;
    }

    // Otherwise, add the new product with an initial count of 1, if we can find that product.
    else {
      const product = products.find((product) => product._id === productId);
      if (product) {
        productsInCart.push({ product, count: 1 });
      }
    }
  });

  // Add an extra property which is the total cost of the items in this cart.
  productsInCart.totalCost = productsInCart
    .map((pic) => pic.product.cost * pic.count)
    .reduce((prev, cost) => prev + cost, 0);

  return productsInCart;
}
