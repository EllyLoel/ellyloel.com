import React from 'react';

const BGWrapper = ({ children }) => {
  return (
    <>
      {children}
      <div className="background"></div>
      <div className="overlay"></div>
    </>
  );
};

export default BGWrapper;
