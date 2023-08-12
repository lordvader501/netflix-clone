import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { signinAuthUser } from '../utils/firebase';

interface SignupProps {
  email:string;
  password:string;
}

const Login = () => {
  const navigate = useNavigate();
  const {register, handleSubmit, reset} = useForm<SignupProps>();

  const handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.classList.add('focused');
  };
  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      e.target.classList.remove('focused');
    }
  };

  const onSubmitSignUp: SubmitHandler<SignupProps> = async (data) => {
    const {email, password} = data;
    try {
      const {user} = await signinAuthUser(email, password);
      console.log(user);
      reset();
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login={false}/>
        <div className="login-container flex a-cneter j-center">
          <div className="login-div flex column a-center">
            <h1>Sign In</h1>
            <div className='form flex column a-center'>
              <div className='field-container flex'>
                <input
                  type="email"
                  onFocus={handleInputFocus}
                  {...register('email', { 
                    required: true, 
                    pattern: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/i, 
                    onBlur: handleInputBlur 
                  })}
                />
                <label htmlFor="email">Email address</label>
              </div>
              <div className='field-container'>
                <input
                  type="password"
                  onFocus={handleInputFocus}
                  {...register('password', {
                    required: true,
                    minLength: 8,
                    maxLength: 15,
                    onBlur: handleInputBlur
                  })}
                />
                <label htmlFor="password">Password</label>
              </div>
              <Button type='submit' onClick={handleSubmit(onSubmitSignUp)}>
                <p>Sign In</p>
              </Button>
              <div className='field-container flex j-between a-center row w-80'>
                <div className='flex a-center'>
                  <input type="checkbox" />
                  <span>Remember me</span>
                </div>
                <a href="#"><span>Need help?</span></a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  .content {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0,0,0,0.5);
    height: 100vh;
    width: 100vw;
    display: grid;
    grid-template-rows: 15vh 85vh;
    .login-container {
      position: relative;
      .login-div {
        background-color: rgba(0,0,0,.75);
        width: 70svh;
        height: 40svw;
        min-height: 500px;
        h1 {
          text-align: left;
          width: 75%;
          position: relative;
          top: 10%;
          font-weight: 900;
        }
        .form {
          position: relative;
          width: 75%;
          top: 15%;
          .field-container {
            position: relative;
            width: 100%;
            margin-bottom: 1rem;
            label {
              position: absolute;
              top: 1.6rem;
              right: 1rem;
              left: 1rem;
              color: #f7f6f6;
              width: min-content;
              white-space: nowrap;
              font-size: 1rem;
              font-weight: 500;
              transition-property: top, font-size, line-height;
              transition-duration: 250ms;
              transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
              z-index: 0;
            }
            input {
              position: relative;
              color: white;
              background: #333333;
              padding: 1.8rem 1rem 0.7rem;
              border-radius: 0.3rem;
              margin: 5px;
              border: 1.3px solid #333333;
              font-weight: 600;
              font-size: 1rem;
              z-index: 0;
              width: -webkit-fill-available;
              &[type='checkbox'] {
                width: min-content;
                color: #b3b3b3;
                padding: 10px 10px;
              }
              &:focus {
                outline: none;
              }
              &.focused +label {
                top: 0.4rem;
                font-size: 0.8rem;
                line-height: 1.7rem;
                transition-property: top, font-size, line-height;
                transition-duration: 250ms;
                transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
              }
            }
            a {
              text-decoration: none;
            }
            span {
              color: #b3b3b3;
            }
          }
        }
      }
    }
  }
`;
const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: larger;
  font-weight: 500;
  background-color: #c11119;
  outline: none;
  border-radius: 0.3rem;
  padding: 15px 50px;
  border: 0;
  color: white;
  height: 87%;
  width: 98%;
  position: relative;
  top: 0.25rem;
  margin-block-end: 1rem;
  cursor: pointer;
  p {
    text-align: center;
    width: auto;
    white-space: nowrap;
  }
  @media screen and (max-width: 850px){
    padding: 15px 20px;
  }
`;
export default Login;