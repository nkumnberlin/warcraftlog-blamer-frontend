import React from 'react';

interface IFeatureRenderer {
  children: any
}

function FeatureRenderer({ children }:IFeatureRenderer) {
  return (
    <>
      {children}
    </>
  );
}

export default FeatureRenderer;
