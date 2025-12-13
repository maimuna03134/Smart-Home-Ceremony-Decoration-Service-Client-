import React from 'react';
import MyContainer from '../../components/container/MyContainer';
import Card from './Card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import Loader from '../shared/loader/Loader';
import ErrorPage from '../shared/errorPage/ErrorPage';

const Services = () => {
  const {data:services=[], isLoading, isError} = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const result = await axios(`${import.meta.env.VITE_API_URL}/services`);
      return result.data;
    },
  });
  // console.log(data);

  if (isLoading) return <Loader />
  if(isError) return <ErrorPage/>
    return (
      <MyContainer>
        {services && services.length > 0 ? (
          <div className="pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
            {services.map((service) => (
              <Card key={service._id} service={service} />
            ))}
          </div>
        ) : (
          "null"
        )}
      </MyContainer>
    );
};

export default Services;