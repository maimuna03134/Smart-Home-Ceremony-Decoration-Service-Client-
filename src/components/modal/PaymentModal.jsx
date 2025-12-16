import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { CreditCard, Loader2 } from "lucide-react";

const PaymentModal = ({ isOpen, closeModal, booking }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!booking) return null;

  const {
    _id,
    serviceName,
    serviceCategory,
    servicePrice,
    serviceImage,
    bookingDate,
    location,
  } = booking || {};

  const handlePayment = async () => {
     try {
       setLoading(true);

       const paymentInfo = {
         bookingId: _id,
         serviceName,
         serviceCategory,
         servicePrice: Number(servicePrice), 
         serviceImage,
         bookingDate,
         location,
         customer: {
           name: user?.displayName,
           email: user?.email,
           image: user?.photoURL,
         },
       };
console.log(paymentInfo.serviceImage);
       const { data } = await axios.post(
         `${import.meta.env.VITE_API_URL}/create-checkout-session`,
         paymentInfo
       );
       console.log(data)

       if (data?.url) {
         window.location.href = data.url; 
       } else {
         console.error("No checkout URL returned", data);
         alert("Payment session create failed");
       }
     } catch (error) {
       console.error("PAYMENT ERROR:", error.response?.data || error.message);
       alert("Payment failed. Please try again.");
     } finally {
       setLoading(false);
     }

    // if (data.url) {
    //   window.location.href = data.url;
    // } else {
    //   toast.error("Failed to create checkout session");
    // }
  };
  return (
    <Dialog
      open={isOpen}
      as="div"
      className="relative z-10 focus:outline-none"
      onClose={closeModal}
    >
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/50 backdrop-blur-sm">
        <div className="flex min-h-full items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg bg-white p-6 shadow-2xl rounded-2xl transform transition-all">
            <DialogTitle
              as="h3"
              className="text-2xl font-bold text-center mb-4 bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent"
            >
              Confirm Payment
            </DialogTitle>

            {/* Service Preview */}
            <div className="mb-6">
              <img
                src={serviceImage}
                alt={serviceName}
                className="w-full h-40 object-cover rounded-xl mb-4"
              />
            </div>

            {/* Booking Details */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm font-medium text-gray-600">
                  Service:
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {serviceName}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm font-medium text-gray-600">
                  Category:
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {serviceCategory}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm font-medium text-gray-600">
                  Booking Date:
                </span>
                <span className="text-sm font-semibold text-gray-900">
                  {new Date(bookingDate).toLocaleDateString("en-GB")}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm font-medium text-gray-600">
                  Location:
                </span>
                <span className="text-sm font-semibold text-gray-900 text-right max-w-xs">
                  {location}
                </span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b">
                <span className="text-sm font-medium text-gray-600">
                  Customer:
                </span>
                <div className="flex items-center gap-2">
                  <img
                    src={user?.photoURL}
                    alt={user?.displayName}
                    className="w-6 h-6 rounded-full"
                  />
                  <span className="text-sm font-semibold text-gray-900">
                    {user?.displayName}
                  </span>
                </div>
              </div>

              {/* Total Amount */}
              <div className="flex justify-between items-center pt-4 bg-linear-to-r from-purple-50 to-pink-50 p-4 rounded-xl">
                <span className="text-lg font-bold text-gray-900">
                  Total Amount:
                </span>
                <span className="text-2xl font-bold text-purple-600">
                  ৳ {servicePrice}
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={closeModal}
                disabled={loading}
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handlePayment}
                disabled={loading}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:shadow-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CreditCard className="w-5 h-5" />
                Pay Now
                
              </button>
            </div>

            {/* Security Note */}
            <p className="text-xs text-center text-gray-500 mt-4">
              🔒 Secure payment powered by Stripe
            </p>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentModal;

// {
//   loading ? (
//     <>
//       <Loader2 className="w-5 h-5 animate-spin" />
//       Processing...
//     </>
//   ) : (
//     <>
//       <CreditCard className="w-5 h-5" />
//       Pay Now
//     </>
//   );
// }