import HomePage from "./container/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProductListPage from "./container/ProductListPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isUserLoggedIn, updateCart } from "./actions";
import ProductDetailsPage from "./container/ProductDetailsPage";
import "./App.css";
import CartPage from "./container/cartPage";
import CheckoutPage from "./container/CheckOutPage";
import OrderPage from "./container/OrderPage";
import OrderDetailsPage from "./container/OrderDetailsPage";
function App(props) {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    console.log("app.js--updateCart");
    dispatch(updateCart());
  }, [auth.authenticate]);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<HomePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/account/orders" element={<OrderPage />} />
          <Route
            path="/order_details/:orderId"
            element={<OrderDetailsPage />}
          />

          <Route
            path="/:productSlug/:productId/p"
            element={<ProductDetailsPage />}
          />
          <Route path="/:slug" element={<ProductListPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
