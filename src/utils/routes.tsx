import React, { useEffect,useContext } from 'react';
import { createBrowserRouter, useNavigate } from 'react-router-dom';
import NetflixLayout from '../pages/NetflixLayout';
import Signup from '../pages/Signup';
import Login from '../pages/Login';
import { UserContext } from '../context/User.context';

const routes = createBrowserRouter([
  {
    path: '/',
    Component: () => {
      const { currUser } = useContext(UserContext);
      return currUser ? <NetflixLayout /> : <Signup />;
    }
  },
  {
    path: '/login',
    Component: () => {
      const { currUser } = useContext(UserContext);
      const navigate = useNavigate();
      useEffect(() => {
        if (!currUser) navigate('/login');
        else navigate('/');
      },[currUser]);
      return <Login />;
    }
  },
]);

export default routes;