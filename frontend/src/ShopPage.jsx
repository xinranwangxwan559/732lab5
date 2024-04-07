import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
import Product from "./Product";
import styles from "./ShopPage.module.css";
import ShoppingCart from "./ShoppingCart";

/**
 * Renders the list of products for sale, along with the user's cart and a link to their order history.
 */
export default function ShopPage() {
  const { products } = useContext(AppContext);

  return (
    <>
      <h1>🚀Rocket Game Corner 🚀 - Prize Shop</h1>
      <div className={styles.mainGrid}>
        <div className={styles.productContainer}>
          {products.map((product) => (
            <Product key={product._id} item={product} />
          ))}
        </div>
        <div>
          <div className={styles.cartContainer}>
            <ShoppingCart />
            <hr />
            <h3>
              View your order history <Link to="/history">here</Link>.
            </h3>
          </div>
        </div>
      </div>
    </>
  );
}
