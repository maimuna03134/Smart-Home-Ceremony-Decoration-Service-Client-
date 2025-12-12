import React from 'react';
import MyContainer from '../../components/container/MyContainer';
import Card from './Card';

const Services = () => {
    return (
      <MyContainer>
        <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
          <Card />
        </div>
      </MyContainer>
    );
};

export default Services;