import { Link } from "react-router-dom";
import styles from "./ShoppingCart.module.css";
import useShoppingCartProducts from "./useShoppingCartProducts";

/**
 * Displays the items in user's shopping cart, grouped by item - i.e. instead of displaying "Abra, Abra, Abra", it would display "Abra x3".
 * Also displays the total cost of items in the cart.
 */
export default function ShoppingCart() {
  const productsInCart = useShoppingCartProducts();

  return (
    <div className={styles.cart}>
      <h3>My cart</h3>
      {productsInCart.map((group, index) => (
        <ShoppingCartItem key={index} group={group} />
      ))}

      <p style={{ alignSelf: "flex-end" }}>
        <strong>Total cost:</strong> 🪙{productsInCart.totalCost.toLocaleString("en-NZ")}
      </p>
      <Link to="/checkout" style={{ alignSelf: "flex-end" }}>
        Checkout
      </Link>
    </div>
  );
}

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

function ShoppingCartItem({ group }) {
  const { product, count } = group;
  return (
    <div className={styles.cartItem}>
      <img width={50} height={50} src={IMAGE_BASE_URL + product.image} className={styles.image} />
      <span style={{ flexGrow: 1 }}>
        <strong>{product.name}</strong>
      </span>
      <span>x {count}</span>
    </div>
  );
}
