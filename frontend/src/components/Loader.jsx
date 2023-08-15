import React, { useEffect, useState } from 'react';
import { Audio } from 'react-loader-spinner';

const withLoader = (WrappedComponent) => {
  return (props) => {
    const [loadingInProgress, setLoading] = useState(true);

    // Simulate data loading or any other asynchronous operation
    useEffect(() => {
      setTimeout(() => {
        setLoading(false); // Set loading to false after a delay (simulating data loading)
      }, 2000);
    }, []);

    return (
      <>
        {loadingInProgress ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Audio
              height={100}
              width={100}
              color='red'
              ariaLabel='loading'
            />
          </div>
        ) : (
          <WrappedComponent {...props} />
        )}
      </>
    );
  };
};

export default withLoader;
