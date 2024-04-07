import { Navigate, Route, Routes } from "react-router-dom";
import CheckoutPage from "./CheckoutPage";
import OrdersPage from "./OrdersPage";
import PageLayout from "./PageLayout";
import ShopPage from "./ShopPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<PageLayout />}>
        <Route index element={<Navigate to="shop" replace />} />

        <Route path="shop" element={<ShopPage />} />
        <Route path="checkout" element={<CheckoutPage />} />
        <Route path="history" element={<OrdersPage />} />
      </Route>
    </Routes>
  );
}

export default App;
