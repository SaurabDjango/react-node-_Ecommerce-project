import React, { useState } from 'react';
import { Audio } from 'react-loader-spinner';

export const commonLoader = (Component) => {
  return (props) => {
    const [loading, setLoading] = useState(false);

    const startLoading = () => {
      setLoading(true);
    };

    const stopLoading = () => {
      setLoading(false);
    };

    return (
      <>
        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Audio height={100} width={100} color='red' ariaLabel='loading' />
          </div>
        ) : (
          <Component {...props} startLoading={startLoading} stopLoading={stopLoading} />
        )}
      </>
    );
  };
};
