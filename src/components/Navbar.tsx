import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { signOutUser } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

const Navbar:React.FC = () => {
  const navigate = useNavigate();
  const signOutHandler =async () => {
    await signOutUser();
    navigate('/login');
  };
  return (
    <Container className='flex a-center j-between'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <Link to='/login' onClick={signOutHandler}><button className='button' >Sign Out</button></Link>
    </Container>
  );
};

const Container = styled.div`
  padding: 0 4rem;
  .logo {
    img {
      height: 5rem;
    }
    button {
      padding: 0.5rem 1rem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;
      border-radius: 0.2rem;
      font-weight: bolder;
      font-size: 1.05rem;
    }
  }
  @media screen and (max-width: 850px){
    padding: 0 1rem 0 0;
    width: inherit;
  }
`;

export default Navbar;