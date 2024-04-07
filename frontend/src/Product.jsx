import { useContext } from "react";
import { AppContext } from "./AppContextProvider";
import styles from "./Product.module.css";

const IMAGE_BASE_URL = import.meta.env.VITE_IMAGE_BASE_URL ?? "";

export default function Product({ item }) {
  const { addToCart } = useContext(AppContext);

  return (
    <div className={styles.product}>
      <div>
        <img width={200} height={200} src={IMAGE_BASE_URL + item.image} className={styles.image} />
      </div>
      <div>
        <h3>{item.name}</h3>
        <p>
          <strong>Cost: </strong>🪙{item.cost.toLocaleString("en-NZ")}
        </p>
        <button onClick={() => addToCart(item)}>Add to cart</button>
      </div>
    </div>
  );
}
