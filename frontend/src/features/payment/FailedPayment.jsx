import { FaTimesCircle } from "react-icons/fa"; // For error icon

function FailedPayment() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100 text-center">
      <FaTimesCircle className="text-danger display-1 mb-3" />
      <h2 className="text-danger fw-bold">Payment Failed!</h2>
      <p className="text-muted">
        Something went wrong. Please try again or contact support.
      </p>
      <a href="/" className="btn btn-success mt-3">
        Go to Home
      </a>
    </div>
  );
}

export default FailedPayment;
