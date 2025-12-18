import React from 'react';
import ManageBookings from './ManageBookings/ManageBookings';
import ManageDecorators from './ManageDecorators/ManageDecorators';
import ManageServices from './ManageServices&Packages/ManageServices';
import AnalyticsCharts from './AnalyticsCharts/AnalyticsCharts';
import Revenue from './Revenue/Revenue';

const AdminDashboard = () => {
    return (
        <div>
            <ManageBookings />
            <ManageDecorators />
            <ManageServices />
            <AnalyticsCharts />
            <Revenue/>
        </div>
    );
};

export default AdminDashboard;