import React, { useState } from 'react';
import BackgroundImage from '../components/BackgroundImage';
import Header from '../components/Header';
import styled from 'styled-components';
import tvImg from '../assets/tv.png';
import tvVid from '../assets/video-tv-in-0819.m4v';

const Signup = () => {
  const [changeLogin, setChangeLogin] = useState(true);

  const handleInputFocus = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.classList.add('focused');
  };
  const handleInputBlur = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === '') {
      e.target.classList.remove('focused');
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
              <input type="email" name="email" onFocus={handleInputFocus} onBlur={handleInputBlur}/>
              <label htmlFor="email">Email address</label>
            </div>
            <div className='field-container'>
              <input type="password" name="password" onFocus={handleInputFocus} onBlur={handleInputBlur}/>
              <label htmlFor="password">Password</label>
            </div>
            {/* <div className='field-container flex a-center'>
              <button className='button'>Get Started</button>
            </div> */}
            <Button>
              <p>Get Started</p>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" data-mirrorinrtl="true" className="default-ltr-cache-0 e1mhci4z1" data-name="ChevronRight" aria-hidden="true"><path fillRule="evenodd" clipRule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path></svg>
            </Button>
          </div>
        </div>
        <div className='flex row tv-container j-center'>
          <div className='flex j-center'>
            <div className='text tv-text j-center a-center flex column'>
              <h1>Enjoy on your TV</h1>
              <h4>Watch on smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players and more.</h4>
            </div>
            <div className='video-container'>
              <img src={tvImg} alt="tv" />
              <div className='video'>
                <video src={tvVid} autoPlay playsInline loop muted></video>
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
    .tv-container {
      width: 100vw;
      position: relative;
      border-top: 0.5rem solid #232323;
      padding-bottom: 80px;
      .tv-text {
        width: 30%;
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
        img {
          position: relative;
          z-index: 1;
          width: 100%;
        }
        .video {
          position: absolute;
          z-index: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
          max-width: 73%;
          max-height: 54%;
          top: 21%;
          left: 13%;
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
`;
export default Signup;