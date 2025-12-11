import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";

const PaymentCallback:React.FC = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const reference = params.get("reference");
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/payment/verify?reference=${reference}`);
        if (res.data.message?.includes("verified")) {
          alert("Payment successful!");
        } else {
          alert("Payment failed or not verified.");
        }
      } catch (err) {
        console.error("Payment verification error:", err);
        alert("Error verifying payment");
      } finally {
        navigate("/dashboard/payments");
      }
    };

    verifyPayment();
  }, [params, navigate]);

  return <p>Verifying payment...</p>;
};

export default PaymentCallback;
