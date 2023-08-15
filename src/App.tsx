import React from 'react';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import routes from './utils/routes';
import { UserProvider } from './context/User.context';

function App() {
  return (
    <UserProvider>
      <RouterProvider router={routes} />
    </UserProvider>
  );
}

export default App;
