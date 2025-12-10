import React from 'react';
import ServiceCard from '../../components/cards/ServiceCard';
import ServiceDetails from '../servicesPage/ServiceDetails';

const Home = () => {
    return (
        <div>
            Hi👋, I'm home
            <br />
            <ServiceCard />
            <ServiceDetails/>
        </div>
    );
};

export default Home;