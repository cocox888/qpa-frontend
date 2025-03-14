import React from 'react';
const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="w-full flex justify-center my-4">
        <div className="loader-primary"></div>
      </div>
    </div>
  );
};

export default Loader;
