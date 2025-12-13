import React from 'react';
import ServiceCard from '../../components/cards/ServiceCard';
import ServiceDetails from '../servicesPage/ServiceDetails';
// import ManageServices from '../manageServices/ManageServices';

const Home = () => {
    return (
        <div>
            Hi👋, I'm home
            <br />
            <ServiceCard />
            <ServiceDetails />
            {/* <ManageServices/> */}
            
        </div>
    );
};

export default Home;