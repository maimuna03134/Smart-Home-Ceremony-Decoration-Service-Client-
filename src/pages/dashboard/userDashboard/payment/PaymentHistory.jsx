import React from "react";

const PaymentHistory = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [processing, setProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState("");
  return (
    <div></div>
  );
};

export default PaymentHistory;
