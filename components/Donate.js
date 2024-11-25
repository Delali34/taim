import React, { useState, useEffect } from "react";
import { Heart, Shield } from "lucide-react";
import dynamic from "next/dynamic";

// Dynamically import PaystackButton with SSR disabled
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

const DonateComponent = () => {
  const [formData, setFormData] = useState({
    amount: "",
    email: "",
    name: "",
  });
  const [message, setMessage] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const DONATION_TIERS = [
    { amount: 20, label: "Basic", description: "Supporter" },
    { amount: 50, label: "Standard", description: "Champion" },
    { amount: 100, label: "Premium", description: "Hero" },
    { amount: 200, label: "Platinum", description: "Legend" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "amount") {
      const validatedValue = value.replace(/[^\d.]/g, "");
      const decimalCount = validatedValue.split(".").length - 1;
      if (decimalCount > 1) return;

      setFormData((prev) => ({
        ...prev,
        [name]: validatedValue,
      }));
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePaystackSuccessAction = (reference) => {
    setMessage({
      type: "success",
      text: "Thank you for your donation! Transaction completed successfully.",
    });
    setFormData({
      amount: "",
      email: "",
      name: "",
    });
    console.log(reference);
  };

  const handlePaystackCloseAction = () => {
    setMessage({
      type: "error",
      text: "Transaction cancelled. Please try again when you're ready.",
    });
  };

  const config = {
    email: formData.email,
    amount: Math.round(parseFloat(formData.amount || 0) * 100), // Convert to pesewas
    publicKey: "pk_test_6dc34e3a28ce202fddbadb433c42390b0f52a8f9",
    text: "Complete Donation",
    currency: "GHS",
    metadata: {
      name: formData.name,
      custom_fields: [],
    },
    onSuccess: handlePaystackSuccessAction,
    onClose: handlePaystackCloseAction,
  };

  const isFormValid = formData.amount && formData.email && formData.name;

  return (
    <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg">
      {/* Header */}
      <div className="p-6 text-center space-y-4">
        <div className="flex justify-center">
          <Heart className="w-12 h-12 text-rose-500" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Make a Donation</h2>
        <p className="text-gray-600">Support our cause</p>
      </div>

      {/* Alert Message */}
      {message && (
        <div
          className={`mx-6 p-4 mb-4 rounded-lg ${
            message.type === "success"
              ? "bg-green-50 text-green-800 border border-green-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Form */}
      <div className="p-6 space-y-6">
        {/* Donation Tiers */}
        <div className="grid grid-cols-2 gap-3">
          {DONATION_TIERS.map(({ amount, label, description }) => (
            <button
              key={amount}
              type="button"
              onClick={() =>
                setFormData((prev) => ({ ...prev, amount: amount.toString() }))
              }
              className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                formData.amount === amount.toString()
                  ? "border-blue-500 bg-blue-50 text-blue-700"
                  : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
              }`}
            >
              <span className="block font-medium">₵{amount}</span>
              <span className="text-xs text-gray-500">{description}</span>
            </button>
          ))}
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Custom Amount (₵)
            </label>
            <input
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter amount"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
        </div>

        {/* Paystack Button */}
        {isClient && (
          <div className="space-y-4">
            <div className="text-center">
              <span className="text-2xl font-bold text-gray-900">
                Total: ₵{formData.amount || "0"}
              </span>
            </div>
            {isFormValid ? (
              <PaystackButton
                {...config}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-colors duration-200"
              />
            ) : (
              <button
                disabled
                className="w-full bg-gray-300 cursor-not-allowed text-gray-500 py-3 px-4 rounded-lg font-medium"
              >
                Please fill all fields
              </button>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-center text-sm text-gray-500 pt-4 border-t">
          <Shield className="w-4 h-4 mr-2" />
          <span>Secure payment powered by Paystack</span>
        </div>
      </div>
    </div>
  );
};

export default DonateComponent;
