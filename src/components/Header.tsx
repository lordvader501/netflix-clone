import React from 'react';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

interface HeaderPropsType {
  login: boolean;
  toggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderPropsType> = (props) => {
  const navigate = useNavigate();
  return (
    <Container className='flex a-center j-between'>
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <button className='button' onClick={() => navigate(props.login ? '/login' : '/signup')}>{props.login ? 'Sign In' : 'Sign Up'}</button>
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
      padding: 0. Srem Irem;
      background-color: #e50914;
      border: none;
      cursor: pointer;
      color: white;
      border-radius: 0.2rem;
      font-weight: bolder;
      font-size: 1.05rem;
    }
  }
`;

export default Header;