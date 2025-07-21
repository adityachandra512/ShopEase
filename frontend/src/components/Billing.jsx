

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FiUser, FiList, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const BillingPage = ({ clearCart }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  // Stepper state
  const [step, setStep] = useState(1);
  const [paymentType, setPaymentType] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [customer, setCustomer] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });
  const [errors, setErrors] = useState({});

  const totalPrice = cart.reduce(
    (sum, item) => sum + item.Price * item.quantity,
    0
  );

  // Step 1 validation
  const validateCustomer = () => {
    const errs = {};
    if (!customer.name.trim()) errs.name = "Name is required";
    if (!customer.email.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(customer.email)) errs.email = "Valid email required";
    if (!customer.phone.trim() || !/^\d{10}$/.test(customer.phone)) errs.phone = "Valid 10-digit phone required";
    if (!customer.address.trim()) errs.address = "Address is required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (step === 1) {
      if (validateCustomer()) setStep(2);
    } else if (step === 2) {
      setStep(3);
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePayment = () => {
    if (!paymentType) {
      setErrors({ paymentType: "Select a payment method" });
      return;
    }
    setPaymentSuccess(true);
    setTimeout(() => {
      clearCart();
      navigate("/");
    }, 2000);
  };

  // Stepper UI
  const steps = [
    { label: "Customer Info", icon: <FiUser className="w-5 h-5" /> },
    { label: "Order Summary", icon: <FiList className="w-5 h-5" /> },
    { label: "Payment", icon: <FiCreditCard className="w-5 h-5" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 flex flex-col items-center py-10 px-2">
      <h1 className="text-3xl font-extrabold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 tracking-tight">Checkout</h1>
      {/* Stepper */}
      <div className="flex mb-10 w-full max-w-3xl">
        {steps.map((s, i) => (
          <div key={s.label} className="flex-1 flex flex-col items-center relative">
            <div className={`transition-all duration-300 z-10 rounded-full w-12 h-12 flex items-center justify-center text-xl font-bold border-4 ${step > i+1 ? 'bg-green-500 border-green-400 text-white' : step === i+1 ? 'bg-blue-600 border-blue-400 text-white shadow-lg' : 'bg-gray-200 border-gray-300 text-gray-400'}`}>{step > i+1 ? <FiCheckCircle className="w-7 h-7" /> : s.icon}</div>
            <span className={`mt-2 text-sm font-semibold ${step === i+1 ? 'text-blue-700' : step > i+1 ? 'text-green-600' : 'text-gray-400'}`}>{s.label}</span>
            {i < steps.length-1 && <div className={`absolute top-6 left-1/2 w-full h-1 ${step > i+1 ? 'bg-green-400' : 'bg-gray-200'} z-0`} style={{transform: 'translateX(24px)', width: 'calc(100% - 48px)'}} />}
          </div>
        ))}
      </div>

      <div className="w-full max-w-3xl flex flex-col md:flex-row gap-8">
        {/* Main Card */}
        <div className="flex-1 bg-white/90 rounded-2xl shadow-2xl p-8 transition-all duration-500 animate-fadein">
          {/* Step 1: Customer Info */}
          {step === 1 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-blue-700">Customer Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Name</label>
                  <input type="text" className="w-full border-2 border-blue-100 focus:border-blue-400 rounded-lg px-4 py-2 transition" value={customer.name} onChange={e => setCustomer({ ...customer, name: e.target.value })} />
                  {errors.name && <span className="text-xs text-red-500">{errors.name}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Email</label>
                  <input type="email" className="w-full border-2 border-blue-100 focus:border-blue-400 rounded-lg px-4 py-2 transition" value={customer.email} onChange={e => setCustomer({ ...customer, email: e.target.value })} />
                  {errors.email && <span className="text-xs text-red-500">{errors.email}</span>}
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Phone</label>
                  <input type="tel" className="w-full border-2 border-blue-100 focus:border-blue-400 rounded-lg px-4 py-2 transition" value={customer.phone} onChange={e => setCustomer({ ...customer, phone: e.target.value })} />
                  {errors.phone && <span className="text-xs text-red-500">{errors.phone}</span>}
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold mb-2">Address</label>
                  <textarea className="w-full border-2 border-blue-100 focus:border-blue-400 rounded-lg px-4 py-2 transition" rows={3} value={customer.address} onChange={e => setCustomer({ ...customer, address: e.target.value })} />
                  {errors.address && <span className="text-xs text-red-500">{errors.address}</span>}
                </div>
              </div>
              <div className="flex justify-end mt-8">
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition" onClick={handleNext}>Next</button>
              </div>
            </>
          )}

          {/* Step 2: Order Summary */}
          {step === 2 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-blue-700">Order Summary</h2>
              {cart.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
                <div className="mb-6 divide-y divide-blue-50">
                  {cart.map((item) => (
                    <div key={item.ID} className="flex justify-between items-center py-3">
                      <div>
                        <h4 className="font-semibold text-lg">{item.Name}</h4>
                        <p className="text-sm text-gray-500">${item.Price} x {item.quantity}</p>
                      </div>
                      <p className="font-semibold text-blue-700 text-lg">${(item.Price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                  <div className="flex justify-between font-bold text-xl pt-4">
                    <span>Total:</span>
                    <span className="text-purple-700">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              )}
              <div className="flex justify-between mt-8">
                <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold shadow hover:bg-gray-200 transition" onClick={handleBack}>Back</button>
                <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition" onClick={handleNext}>Next</button>
              </div>
            </>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <>
              <h2 className="text-2xl font-bold mb-6 text-blue-700">Payment Method</h2>
              <div className="space-y-3">
                {['Credit Card', 'Debit Card', 'Net Banking', 'UPI'].map((type) => (
                  <label key={type} className={`flex items-center px-4 py-3 rounded-lg border-2 cursor-pointer transition-all ${paymentType === type ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-blue-50'}`}>
                    <input
                      type="radio"
                      name="paymentType"
                      value={type}
                      checked={paymentType === type}
                      onChange={(e) => { setPaymentType(e.target.value); setErrors({}); }}
                      className="mr-3 accent-blue-600"
                    />
                    <span className="font-medium">{type}</span>
                  </label>
                ))}
                {errors.paymentType && <span className="text-xs text-red-500">{errors.paymentType}</span>}
              </div>
              <div className="flex justify-between mt-8">
                <button className="bg-gray-100 text-gray-700 px-8 py-3 rounded-xl font-bold shadow hover:bg-gray-200 transition" onClick={handleBack}>Back</button>
                <button className="bg-gradient-to-r from-green-500 to-blue-600 text-white px-8 py-3 rounded-xl font-bold shadow-lg hover:scale-105 transition" onClick={handlePayment}>Make Payment</button>
              </div>
              {paymentSuccess && (
                <div className="mt-8 p-6 bg-green-100 text-green-800 rounded-xl text-center animate-fadein">
                  <FiCheckCircle className="w-10 h-10 mx-auto mb-2 text-green-600 animate-bounce" />
                  <div className="font-bold text-lg">Payment successful! Redirecting to the homepage...</div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Sidebar summary for desktop */}
        <div className="hidden md:block w-80">
          <div className="sticky top-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl shadow-xl p-6">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Order Summary</h3>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="divide-y divide-blue-200 mb-4">
                {cart.map((item) => (
                  <li key={item.ID} className="py-2 flex justify-between items-center">
                    <span className="font-medium text-gray-700">{item.Name}</span>
                    <span className="text-gray-500 text-sm">x{item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
            <div className="flex justify-between font-bold text-lg border-t pt-4">
              <span>Total:</span>
              <span className="text-purple-700">${totalPrice.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animations */}
      <style jsx="true">{`
        @keyframes fadein {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadein { animation: fadein 0.7s; }
      `}</style>
    </div>
  );
};

export default BillingPage;
