import React from 'react';
import errorPage from '../../../assets/error_page.png'
const ErrorPage = () => {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center">
        <img src={errorPage} alt="" className="w-[400px] h-[300px]" />

        <div className="mt-5">
          <h1 className="text-4xl font-bold mb-2 text-gray-800">
            404 — Page Not Found!
          </h1>

          <p className="text-lg text-gray-700 mb-4">
            Oops! Looks like you took a wrong turn somewhere 🚧
          </p>

          {/* <p className="text-md text-gray-600">
            Don’t worry, even the best chefs burn a toast sometimes 🍞🔥 <br />
            Let’s get you back on track 👇
          </p> */}
        </div>
        <a
          href="/"
          className="mt-6 bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-full transition-all"
        >
          Go Home 🏠
        </a>
      </div>
    );
};

export default ErrorPage;