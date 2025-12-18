import React from 'react';
import PaymentHistory from './PaymentHistory';
import PaymentSuccess from './PaymentSuccess';

const Payment = () => {
    return (
        <div>
            <PaymentHistory />
            <PaymentSuccess/>
        </div>
    );
};

export default Payment;