import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuantity,
  deleteItem,
  getCart,
  getTotalCartPrice,
  getTotalQuantity,
  increaseItemQuantity,
} from "../../slice/cartSlice";
import { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router";

function ViewCart() {
  const [input, setInput] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  // const navigate = useNavigate();

  const cart = useSelector(getCart);
  const totalQuantity = useSelector(getTotalQuantity);
  const totalCartPrice = useSelector(getTotalCartPrice);

  function handleInput(e) {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    console.log(input);
  }

  async function handleCheckout(e) {
    e.preventDefault();
    // console.log(input);

    try {
      setIsLoading(true);
      // create checkoutSession and sending user and product
      const response = await axios.post(
        "http://127.0.0.1:7000/api/v1/products/create-checkout-session",
        { userData: input, productCart: cart }
      );
      console.log("resss", response);
      const checkoutURL = response.data.session.url;
      // redirect to make Payment
      if (checkoutURL) {
        window.location.href = response.data.session.url;
        // navigate(checkoutURL);
      }
    } catch (e) {
      console.error("Error processing payment:", e);
      alert("Error processing payment:", e);
    } finally {
      setIsLoading(false);
    }
  }

  if (cart.length === 0) {
    return <h3 className="text-center mt-5 text-muted">Your cart is empty</h3>;
  }

  if (isLoading) {
    return (
      <h3 className="d-flex justify-content-center align-items-center vh-100">
        Redirecting you to Stripe Payment Gateway
      </h3>
    );
  }

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Your Cart</h2>
      <div className="row">
        <div className="col-md-8">
          {cart.map((item) => (
            <div className="card mb-3 p-3 shadow-sm border-0" key={item.id}>
              <div className="row g-3 align-items-center">
                <div className="col-md-3 text-center">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="img-fluid rounded shadow-sm"
                    style={{ maxHeight: "120px", objectFit: "cover" }}
                  />
                </div>
                <div className="col-md-5">
                  <h5 className="mb-1">{item.title}</h5>
                  <p className="text-muted mb-1">Price: ${item.price}</p>
                  <p className="mb-1">Quantity: {item.quantity}</p>
                </div>
                <div className="col-md-4 d-flex align-items-center justify-content-end">
                  <button
                    className="btn btn-outline-danger btn-sm mx-1"
                    onClick={() => dispatch(decreaseItemQuantity(item.id))}
                    disabled={item.quantity === 1}
                  >
                    -
                  </button>
                  <span className="text-dark bg-white border px-3 py-1 rounded">
                    {item.quantity}
                  </span>

                  <button
                    className="btn btn-outline-success btn-sm mx-1"
                    onClick={() => dispatch(increaseItemQuantity(item.id))}
                  >
                    +
                  </button>
                  <button
                    className="btn btn-sm btn-danger ms-3"
                    onClick={() => dispatch(deleteItem(item.id))}
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-md-4">
          <div className="p-3 shadow-lg">
            <h4 className="mb-3 text-center">Cart Summary</h4>
            <p className="mb-2">
              <strong>Total Quantity:</strong> {totalQuantity}
            </p>
            <p className="mb-2">
              <strong>Total Price:</strong> ${totalCartPrice.toFixed(2)}
            </p>

            <div className="p-3 shadow-lg border-1">
              <form onSubmit={handleCheckout}>
                <div className="form-group my-2">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Harry Potter"
                    name="name"
                    value={input.name}
                    onChange={handleInput}
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="email">Email address*</label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="email@example.com"
                    name="email"
                    value={input.email}
                    onChange={handleInput}
                    required
                  />
                </div>
                <div className="form-group mb-2">
                  <label htmlFor="address">Address</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street,City"
                    name="address"
                    value={input.address}
                    onChange={handleInput}
                  />
                </div>
                <button className="btn btn-success w-100 mt-3 py-2 fw-bold">
                  Proceed to Checkout
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ViewCart;
