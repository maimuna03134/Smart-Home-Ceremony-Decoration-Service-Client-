import React from 'react';
import MyBookings from './bookingCollections/MyBookings';
import MyProfile from './MyProfile';
import Payment from './payment/Payment';

const UserDashBoard = () => {
    return (
        <div>
            <MyBookings />
            <MyProfile />
            <Payment/>
        </div>
    );
};

export default UserDashBoard;