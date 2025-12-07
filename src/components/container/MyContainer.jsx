import React from "react";

const MyContainer = ({ className, children }) => {
  return (
    <div className={`${className}  container mx-auto px-4 sm:px-6 lg:px-8`}>
      {children}
    </div>
  );
};

export default MyContainer;
