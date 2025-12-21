// import axios from "axios";
// import React, { useEffect } from "react";
// import { IoBagCheckOutline } from "react-icons/io5";
// import { Link, useSearchParams } from "react-router";
// const PaymentSuccess = () => {

//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   useEffect(() => {
//     if (sessionId) {
//       axios.patch(`https://smart-home-and-ceremony-decoration.vercel.app/payment-success`, {
//         sessionId,
//       });
//     }
//   }, [sessionId]);
//   return (
//     <div className="flex flex-col items-center justify-center">
//       <div className="bg-white p-10 rounded-lg shadow-lg text-center">
//         <IoBagCheckOutline className="w-16 h-16 text-green-500 mx-auto mb-4" />
//         <h1 className="text-3xl font-bold text-gray-800 mb-2">
//           Payment Successful!
//         </h1>
//         <p className="text-gray-600 mb-6">
//           Thank you for your purchase. Your order is being processed.
//         </p>
//         <Link
//           to="/dashboard/my-bookings"
//           className="inline-block bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-lime-600 transition duration-300"
//         >
//           Go to My Bookings
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default PaymentSuccess;

// import React, { useEffect } from "react";
// import useAxiosSecure from "../../../../hooks/useAxiosSecure";
// import { useSearchParams } from "react-router";
// import axios from "axios";

// const PaymentSuccess = () => {
//   const [searchParams] = useSearchParams();

//   const sessionId = searchParams.get("session_id");

//   console.log(sessionId);

//   useEffect(() => {
//     if (sessionId) {
//       axios
//         .patch(`https://smart-home-and-ceremony-decoration.vercel.app/payment-success`, {
//           sessionId: sessionId,
//         })
//         .then((res) => {
//           console.log(res.data);
//           //  if (res.data.success) {
//           //    console.log("Payment verified successfully!");
//           //  } else {
//           //    console.log("Backend says success: false", res.data.message);
//           //  }
//           //  setPaymentInfo({
//           //    transactionId: res.data.transactionId,
//           //    trackingId: res.data.trackingId,
//           //  });
//         });
//     }
//   }, [sessionId]);
//   return (
//     <div>
//       <h1 className="text-4xl">Payment successful</h1>
//     </div>
//   );
// };

// export default PaymentSuccess;

import React, { useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router";
import axios from "axios";
import { IoBagCheckOutline } from "react-icons/io5";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios
        .patch(
          `https://smart-home-and-ceremony-decoration.vercel.app/payment-success`,
          {
            sessionId: sessionId,
          }
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.success) {
            console.log("Payment verified successfully!");
          } else {
            console.log("Payment not completed:", res.data.message);
          }
        })
        .catch((error) => {
          console.error("Payment verification error:", error);
        });
    }
  }, [sessionId]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="bg-white p-10 rounded-lg shadow-lg text-center">
        <IoBagCheckOutline className="w-16 h-16 text-primary mx-auto mb-4" />
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mb-6">
          Thank you for your purchase. Your booking is being processed.
        </p>
        <button
          onClick={() => navigate("/dashboard/my-bookings")}
          className="inline-block bg-primary text-white font-semibold py-2 px-4 rounded hover:bg-orange-600 transition duration-300"
        >
          Go to My Bookings
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
