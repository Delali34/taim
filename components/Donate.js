import React, { useState, useEffect } from "react";
import { Heart, Shield, CheckCircle, XCircle, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  { ssr: false }
);

const DonateComponent = () => {
  const [amount, setAmount] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const predefinedAmounts = [
    { value: 20, label: "₵20", description: "Supporter" },
    { value: 50, label: "₵50", description: "Champion" },
    { value: 100, label: "₵100", description: "Hero" },
    { value: 200, label: "₵200", description: "Legend" },
  ];

  const componentProps = {
    email,
    amount: parseFloat(amount || 0) * 100,
    metadata: {
      name,
      custom_fields: [],
    },
    publicKey: "pk_test_6dc34e3a28ce202fddbadb433c42390b0f52a8f9",
    text: `Complete Donation`,
    currency: "GHS",
    onSuccess: (reference) => {
      setMessage({
        type: "success",
        text: "Thank you for your donation! Your transaction was successful.",
      });
      console.log("Payment successful!", reference);
      setAmount("");
      setEmail("");
      setName("");
      setSelectedAmount(null);
    },
    onClose: () => {
      setMessage({
        type: "error",
        text: "Transaction cancelled. Please try again when you're ready.",
      });
    },
  };

  const handleAmountSelect = (value) => {
    setSelectedAmount(value);
    setAmount(value.toString());
  };

  const MessageAlert = ({ type, text }) => {
    if (!text) return null;

    return (
      <div
        className={`flex items-center p-4 mb-6 rounded-lg ${
          type === "success"
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {type === "success" ? (
          <CheckCircle className="w-5 h-5 mr-2" />
        ) : (
          <XCircle className="w-5 h-5 mr-2" />
        )}
        <span className="text-sm font-medium">{text}</span>
      </div>
    );
  };

  const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div className="relative">
      <label className="block text-sm font-semibold text-gray-700 mb-2">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
        placeholder={placeholder}
      />
    </div>
  );

  return (
    <div className="w-full max-w-md mx-auto p-8 bg-gradient-to-b from-white to-gray-50 rounded-2xl shadow-xl">
      <div className="text-center mb-10">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <Heart className="w-16 h-16 text-red-500 animate-pulse" />
            <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2" />
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Make a Difference
        </h2>
        <p className="text-gray-600 text-lg">
          Your generosity creates lasting impact
        </p>
      </div>

      <MessageAlert type={message.type} text={message.text} />

      <div className="space-y-8">
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-700 mb-4">
            Choose Amount
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {predefinedAmounts.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handleAmountSelect(preset.value)}
                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-col items-center ${
                  selectedAmount === preset.value
                    ? "border-blue-500 bg-blue-50 text-blue-600 shadow-md transform scale-105"
                    : "border-gray-200 hover:border-blue-200 hover:bg-blue-50"
                }`}
              >
                <span className="text-lg font-bold">{preset.label}</span>
                <span className="text-xs text-gray-500 mt-1">
                  {preset.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <InputField
            label="Custom Amount (₵)"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter custom amount"
          />

          <InputField
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />

          <InputField
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {isClient && (
          <div
            className={`w-full ${
              !amount || !email || !name ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-gray-800">
                ₵{amount || "0"}
              </span>
            </div>
            <PaystackButton
              {...componentProps}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            />
          </div>
        )}

        <div className="flex items-center justify-center text-sm text-gray-500 mt-6 pt-6 border-t">
          <Shield className="w-4 h-4 mr-2" />
          <span>Secure payment powered by Paystack</span>
        </div>
      </div>
    </div>
  );
};

export default DonateComponent;
