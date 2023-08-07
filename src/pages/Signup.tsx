import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { createAuthUser, createUserDocFromAuth } from '../utils/firebase';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import styled from 'styled-components';
import tvImg from '../assets/tv.png';
import tvVid from '../assets/video-tv-in-0819.m4v';
import mobImg from '../assets/mobile-0819.jpg';
import mobdownImg from '../assets/boxshot.png';
import downGif from '../assets/download-icon.gif';
import tv2Img from '../assets/device-pile-in.png';
import tv2Vid from '../assets/video-devices-in.m4v';
import childImg from '../assets/children.png';

interface SignupProps {
  email:string;
  password:string;
}

const Signup: React.FC = () => {
  const [changeLogin, setChangeLogin] = useState(true);
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
      const {user} = await createAuthUser(email, password);
      await createUserDocFromAuth(user, {email});
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
        <Header login={changeLogin} toggle={setChangeLogin}/>
        <div className="body flex column a-center j-center">
          <div className="text flex column" >
            <h1>Unlimited movies, TV shows and more</h1>
            <h4>Watch anywhere. Cancel anytime.</h4>
            <h6>Ready to watch? Enter your email to create or restart membership</h6>
          </div>
          <div className="form flex">
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
              <p>Get Started</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-mirrorinrtl="true" className="default-ltr-cache-0 e1mhci4z1" data-name="ChevronRight" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path></svg>
            </Button>
          </div>
        </div>
        <div className='flex row div-container j-center'>
          <div className='flex j-center pt-60'>
            <div className='text tv-text j-center a-center flex column'>
              <h1>Enjoy on your TV</h1>
              <h4>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h4>
            </div>
            <div className='video-container flex a-center j-center'>
              <img src={tvImg} alt="tv" />
              <div className='video'>
                <video src={tvVid} autoPlay playsInline loop muted></video>
              </div>
            </div>
          </div>
        </div>
        <div className='flex row div-container j-center'>
          <div className='flex j-center row-reverse'>
            <div className='text tv-text j-center a-center flex column'>
              <h1>Download your shows to watch offline</h1>
              <h4>Save your favourites easily and always have something to watch.</h4>
            </div>
            <div className='mobile-container flex j-center a-center'>
              <img src={mobImg} alt="mobile" />
              <div className='mobile-box flex row a-center'>
                <img src={mobdownImg} alt="boximg" />
                <div className='flex column down-text'>
                  <h4>Stranger Things</h4>
                  <p>Downloading...</p>
                </div>
                <div className="downloading-gif"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex row div-container j-center">
          <div className="flex j-center pt-60">
            <div className='text tv-text j-center a-center flex column'>
              <h1>Watch everywhere</h1>
              <h4>Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.</h4>
            </div>
            <div className='video-container flex a-center j-center'>
              <img src={tv2Img} alt="tv" />
              <div className='video2'>
                <video src={tv2Vid} autoPlay playsInline loop muted></video>
              </div>
            </div>
          </div>
        </div>
        <div className="flex row div-container j-center">
          <div className="flex j-center row-reverse pt-60">
            <div className='text tv-text j-center a-center flex column'>
              <h1>Create profiles for kids</h1>
              <h4>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</h4>
            </div>
            <div className='video-container flex a-center j-center'>
              <img src={childImg} alt="tv" />
            </div>
          </div>
        </div>
        <div className="flex row div-container j-center a-center">
          <div className="flex j-center column pt-60">
            <div className="text text-center tv-text flex j-center">
              <h1>Frequently Asked Questions</h1>
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
    .div-container {
      width: 100vw;
      position: relative;
      border-top: 0.5rem solid #232323;
      padding-bottom: 80px;
      .mobile-container {
        position: relative;
        img {
          height: 70%;
        }
        .mobile-box {
          position: absolute;
          top: 60%;
          border-radius: 0.8rem;
          border: 0.1rem solid #494949;
          z-index: 1;
          background-color: black;
          padding: 0.5rem;
          justify-content: space-between;
          width: 60%;
          img {
            width: 20%;
          }
          .down-text {
            justify-content: start;
            width: 55%;
            padding-bottom: 5px;
            h4 {
              padding-left: 5px;
              font-weight: 400;
              font-size: 1rem;
            }
            p {
              color: #0071eb;
              padding-left: 5px;
              font-size: 0.85rem;
            }
          }
          .downloading-gif {
            width: 3rem;
            height: 3rem;
            background: url(${downGif});
            background-size: contain;
            background-position: center;
          }
        }
      }
      .text-center{
        text-align: center !important;
        white-space: nowrap;
      }
      .tv-text {
        width: 45%;
        position: relative;
        text-align: left;
        h1{
          width: 100%;
          font-size: 3rem;
          margin-bottom: 1.5rem;
        }
        h4 {
          width: 100%;
          white-space: pre-line;
          font-size: 1.5rem;
          font-weight: 300;
        }
      }
      .video-container {
        position: relative;
        width: 45%;
        img {
          position: relative;
          z-index: 1;
          width: 98%;
        }
        .video {
          position: absolute;
          z-index: 0;
          overflow: hidden;
          width: 85%;
          top: 21%;
          left: 13%;
          video {
            width: inherit;
          }
        }
        .video2 {
          position: absolute;
          z-index: 0;
          overflow: hidden;
          width: 78%;
          top: 8%;
          left: 19%;
          video {
            width: inherit;
          }
        }
      }
    }
    .body {
      gap: 1rem;
      .text {
        gap: 1rem;
        text-align: center;
        font-size: x-large;
      }
      .form {
        position: relative;
        .field-container {
          position: relative;
          label {
            position: absolute;
            top: 1.4rem;
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
            background: rgba(35, 32, 32, 0.5);
            padding: 1.5rem 1rem 0.5rem;
            border-radius: 0.3rem;
            margin: 5px;
            border: 1.3px solid grey;
            font-weight: 600;
            font-size: 1rem;
            z-index: 1;
            &.focused +label {
              top: 0.4rem;
              font-size: 0.75rem;
              line-height: 1.7rem;
              transition-property: top, font-size, line-height;
              transition-duration: 250ms;
              transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
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
  font-size: larger;
  font-weight: 500;
  background-color: #c11119;
  outline: none;
  border-radius: 0.3rem;
  padding: 5px 50px;
  border: 0;
  color: white;
  height: 87%;
  position: relative;
  top: 0.25rem;
  margin-inline-start: 5px;
  cursor: pointer;
`;
export default Signup;