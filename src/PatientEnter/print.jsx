import React from 'react';

const PrintComponent = () => {

  const handlePrint = () => {
    window.print();
  };

  return (
    <div>  
        <button onClick={handlePrint}>הדפס</button>
    </div>
  );
};

export default PrintComponent;
