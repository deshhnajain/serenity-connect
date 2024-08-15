import React, { useEffect } from "react";
import { useLocation } from 'react-router-dom';

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function PaymentPage() {
  const location = useLocation();
  const appointmentDetails = location.state?.appointmentDetails;

  useEffect(() => {
    showRazorpay();
  }, []);

  async function showRazorpay() {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("https://serenity-connect.onrender.com/api/payment/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_4W26iQdHpqmXmZ", // Enter the Key ID generated from the Dashboard
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Therapy Session",
      description: `Appointment with ${appointmentDetails.therapistName}`,
      handler: function (response) {
        alert("Transaction successful");
        // Here you can add logic to handle successful payment
        // For example, update the appointment status in your database
      },
      prefill: {
        name: appointmentDetails.name,
        email: appointmentDetails.email,
        // phone_number: appointmentDetails.phone // Add this if you have the phone number
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="App">
      <header className="App-header">
        <p>Redirecting to payment portal...</p>
      </header>
    </div>
  );
}

export default PaymentPage;