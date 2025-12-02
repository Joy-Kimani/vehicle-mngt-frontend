
import { useSearchParams } from "react-router";

export default function PaymentSuccess() {
  const [params] = useSearchParams();
  const reference = params.get("reference");

  return (
    <div className="success-container">
      <h1> Payment Successful!</h1>
      <p>Your transaction reference:</p>
      <code>{reference}</code>

      <a href="/dashboard" className="btn btn-success mt-4">
        View Your Bookings
      </a>
    </div>
  );
}
