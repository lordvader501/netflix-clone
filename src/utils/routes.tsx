import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import NetflixLayout from '../pages/NetflixLayout';
import Signup from '../pages/Signup';
import Login from '../pages/Login';

const routes = createBrowserRouter([
  {
    path: '/',
    element: <NetflixLayout />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
]);

export default routes;