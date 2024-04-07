import React from "react";
import useGet from "./useGet";
import { useLocalStorage } from "./useLocalStorage";

export const AppContext = React.createContext({});

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export function AppContextProvider({ children }) {
  // Because we need this data pretty much everywhere in our app, it's a good idea
  // to load it in here, rather than having to make new GET requests every time we change the page.
  const { data: products } = useGet(`${API_BASE_URL}/api/products`, []);

  const [cart, setCart] = useLocalStorage("cart", []);

  const addToCart = (item) => setCart([...cart, item._id]);
  const clearCart = () => setCart([]);

  const context = {
    products,
    cart,
    addToCart,
    clearCart
  };

  return <AppContext.Provider value={context}>{children}</AppContext.Provider>;
}
