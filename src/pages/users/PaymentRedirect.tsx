import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router";

const PaymentRedirect:React.FC = () => {
  const [params] = useSearchParams();
  const reference = params.get("reference");
  const navigate = useNavigate();

  const [status, setStatus] = useState("Verifying payment...");

  useEffect(() => {
    if (!reference) return;

    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_DOMAIN}/payment/verify?reference=${reference}`
        );

        const data = await res.json();

        if (data.status === "success") {
          setStatus("Payment Successful!");
          setTimeout(() => navigate("/dashboard/payments"), 1500);
        } else {
          setStatus("Payment Failed. Please try again.");
        }
      } catch (err) {
        console.error("Verify error:", err);
        setStatus("Error verifying payment.");
      }
    };

    verifyPayment();
  }, [reference]);

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="text-center">
        <h2 className="text-xl font-bold">{status}</h2>
      </div>
    </div>
  );
};

export default PaymentRedirect;
