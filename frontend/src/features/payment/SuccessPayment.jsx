import { FaCheckCircle } from "react-icons/fa"; // For success icon

function SuccessPayment() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <FaCheckCircle className="text-success display-1 mb-3" />
      <h2 className="text-success fw-bold">Payment Successful!</h2>
      <p className="text-muted">
        Thank you for your purchase. Your order has been processed successfully.
      </p>
      <a href="/" className="btn btn-success mt-3">
        Go to Home
      </a>
    </div>
  );
}

export default SuccessPayment;
