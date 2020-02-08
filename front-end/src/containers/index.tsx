import React from 'react';
import { withRouter } from 'react-router-dom';

const withWrap = (loader: React.LazyExoticComponent<any>) => (props: IKeyValueMap) => {
  return <React.Suspense fallback={<></>}>
    {React.createElement(withRouter(loader), props)}
  </React.Suspense>;
};

export const Dashboard = withWrap(React.lazy(() => import(
  /* webpackChunkName: 'dashboard' */
  './dashboard'
)));

export const Gallery = withWrap(React.lazy(() => import(
  /* webpackChunkName: 'gallery' */
  './gallery'
)));

export const Combine = withWrap(React.lazy(() => import(
  /* webpackChunkName: 'combine' */
  './combine'
)))

export { default as Layout } from './layout';