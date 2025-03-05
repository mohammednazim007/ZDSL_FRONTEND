import SuspenseLoader from '@/components/shared/SuspenseLoader';
import React, { Suspense } from 'react';
import Login from './login';

const page = () => {
  return (
    <Suspense fallback={<SuspenseLoader />}>
      <Login />
    </Suspense>

  );
};

export default page;