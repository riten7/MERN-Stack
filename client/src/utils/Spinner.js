import React from 'react';
import spinner from './spinner.gif';

function Spinner() {
  return (
    <div className="spinner">
      <img src={spinner} style={{ width: '100px', height: '100px' }} alt="Loading.." />
    </div>
  )
}

export default Spinner