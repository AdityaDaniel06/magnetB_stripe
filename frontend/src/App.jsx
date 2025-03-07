import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Layout from "./layout/Layout";
import Homepage from "./pages/Homepage";
import ViewCart from "./features/Cart/ViewCart";
import SuccessPayment from "./features/payment/SuccessPayment";
import FailedPayment from "./features/payment/FailedPayment";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="/view-cart" element={<ViewCart />} />
          <Route path="payment_success" element={<SuccessPayment />} />
          <Route path="payment_cancel" element={<FailedPayment />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
