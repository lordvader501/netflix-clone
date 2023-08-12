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
  const navigate = useNavigate();
  const [activeId, setActiveId] = useState<string | null>(null);

  const handleItemClick = (id: string) => {
    setActiveId((prevId) => (prevId === id ? null : id));
  };

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

  // useEffect(() => {
  //   const faqItems = document.querySelectorAll('.faq-item');
  //   const handleClick = (item:HTMLElement) => {
  //     const target = item.getAttribute('itemid');
  //     const faqContents = document.querySelectorAll('.faq-content') as NodeListOf<HTMLDivElement>;

  //     faqContents.forEach((content) => {
  //       if (content.id === target) {
  //         content.style.display = content.style.display === 'block' ? 'none' : 'block';
  //       } else {
  //         content.style.display = 'none';
  //       }
  //     });
  //   };

  //   faqItems.forEach((item) => {
  //     item.addEventListener('click', () => handleClick(item as HTMLElement));

  //     return () => {
  //       item.removeEventListener('click', () => handleClick(item as HTMLElement));
  //     };
  //   });

  // },[]);

  return (
    <Container>
      <BackgroundImage />
      <div className="content">
        <Header login={true}/>
        <div className="body flex column a-center j-center w-inherit">
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
          <div className='flex inner-div j-center pt-60'>
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
          <div className='flex j-center row-reverse pt-60 inner-div'>
            <div className='text tv-text j-center a-center flex column'>
              <h1>Download your shows to watch offline</h1>
              <h4>Save your favourites easily and always have something to watch.</h4>
            </div>
            <div className='mobile-container flex j-center'>
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
          <div className="flex inner-div j-center pt-60">
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
          <div className="flex j-center row-reverse pt-60 inner-div">
            <div className='text tv-text j-center a-center flex column'>
              <h1>Create profiles for kids</h1>
              <h4>Send children on adventures with their favourite characters in a space made just for them—free with your membership.</h4>
            </div>
            <div className='video-container flex a-center j-center'>
              <img src={childImg} alt="tv" />
            </div>
          </div>
        </div>
        <Faq className="flex row div-container j-center a-center w-100">
          <div className="flex a-center j-center column w-100 pt-60">
            <h1 className='faq-heading'>Frequently Asked Questions</h1>
            <div className='flex a-center j-center pt-20 w-100'>
              <ul>
                <li>
                  <h3 className='faq-item' itemID='faq-1' onClick={() => handleItemClick('faq-1')}>
                    <span>What is Netflix?</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${activeId === 'faq-1' ? 'rotate': ''}`} data-name="Plus"><path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path></svg>
                  </h3>
                  <div className={`${activeId === 'faq-1' ? 'show-faq' : 'faq-content'}`} id='faq-1'>
                    <span>
                      Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries and more – on thousands of internet-connected devices.
                      <br/><br/>
                      You can watch as much as you want, whenever you want, without a single ad – all for one low monthly price. There&apos;s always something new to discover, and new TV shows and movies are added every week!
                    </span>
                  </div>
                </li>
                <li>
                  <h3 className='faq-item' itemID='faq-2' onClick={() => handleItemClick('faq-2')}>
                    <span>How much does Netflix cost?</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${activeId === 'faq-2' ? 'rotate': ''}`} data-name="Plus"><path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path></svg>
                  </h3>
                  <div className={`${activeId === 'faq-2' ? 'show-faq' : 'faq-content'}`} id='faq-2'>
                    <span>
                      Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from ₹ 649 to ₹ 149 a month. No extra costs, no contracts.
                    </span>
                  </div>
                </li>
                <li>
                  <h3 className='faq-item' itemID='faq-3' onClick={() => handleItemClick('faq-3')}>
                    <span>Where can I watch?</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${activeId === 'faq-3' ? 'rotate': ''}`} data-name="Plus"><path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path></svg>
                  </h3>
                  <div className={`${activeId === 'faq-3' ? 'show-faq' : 'faq-content'}`} id='faq-3'>
                    <span>
                      Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device that offers the Netflix app, including smart TVs, smartphones, tablets, streaming media players and game consoles.
                      <br /><br />
                      You can also download your favourite shows with the iOS, Android, or Windows 10 app. Use downloads to watch while you&apos;re on the go and without an internet connection. Take Netflix with you anywhere.
                    </span>
                  </div>
                </li>
                <li>
                  <h3 className='faq-item' itemID='faq-4' onClick={() => handleItemClick('faq-4')}>
                    <span>How do I cancel?</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${activeId === 'faq-4' ? 'rotate': ''}`} data-name="Plus"><path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path></svg>
                  </h3>
                  <div className={`${activeId === 'faq-4' ? 'show-faq' : 'faq-content'}`} id='faq-4'>
                    <span>
                      Netflix is flexible. There are no annoying contracts and no commitments. You can easily cancel your account online in two clicks. There are no cancellation fees – start or stop your account anytime.
                    </span>
                  </div>
                </li>
                <li>
                  <h3 className='faq-item' itemID='faq-5' onClick={() => handleItemClick('faq-5')}>
                    <span>What can I watch on Netflix?</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${activeId === 'faq-5' ? 'rotate': ''}`} data-name="Plus"><path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path></svg>
                  </h3>
                  <div className={`${activeId === 'faq-5' ? 'show-faq' : 'faq-content'}`} id='faq-5'>
                    <span>
                      Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more. Watch as much as you want, anytime you want.
                    </span>
                  </div>
                </li>
                <li>
                  <h3 className='faq-item' itemID='faq-6' onClick={() => handleItemClick('faq-6')}>
                    <span>Is Netflix good for kids?</span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className={`${activeId === 'faq-6' ? 'rotate': ''}`} data-name="Plus"><path fillRule="evenodd" clipRule="evenodd" d="M11 11V2H13V11H22V13H13V22H11V13H2V11H11Z" fill="currentColor"></path></svg>
                  </h3>
                  <div className={`${activeId === 'faq-6' ? 'show-faq' : 'faq-content'}`} id='faq-6'>
                    <span>
                      The Netflix Kids experience is included in your membership to give parents control while kids enjoy family-friendly TV shows and films in their own space. <br /><br />
                      Kids profiles come with PIN-protected parental controls that let you restrict the maturity rating of content kids can watch and block specific titles you don&apos;t want kids to see.
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Faq>
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
          position: relative;
          height: 67%;
        }
        .mobile-box {
          position: absolute;
          top: 45%;
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
        width: 40%;
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
  @media screen and (max-width: 850px){
    .content {
      .div-container {
          .inner-div {
            flex-direction: column;
            align-items: center;
            width: inherit;
            .text {
              width: 80%;
              text-align: center;
              h1 {
                font-size: 1.7rem;
                margin-bottom: 1rem;
                width: inherit;
              }
              h4 {
                font-size: 0.8rem;
              }
            }
            .video-container {
              width: 80%;
            }
          }
        }
      .body {
        height: 75vw;
        @media screen and (max-width: 550px){
          height: 100vw;
        }
        @media screen and (max-width: 450px){
          height: 120vw;
        }
        @media screen and (max-width: 350px){
          height: 140vw;
        }
        .text {
          gap: 1.2rem;
          font-size: larger;
          padding: 0 1rem;
          width: 80%;
        }
        .form {
          flex-direction: column;
          width: fit-content;
          min-width: 50%;
          .field-container {
            input {
              min-width: 98%;
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
  @media screen and (max-width: 850px){
    padding: 15px 50px;
  }
`;
const Faq = styled.div`
  .faq-heading {
    font-size: 3rem;
    padding-inline: 2rem;
    text-align: center;
    @media screen and (max-width:420px){
      font-size: 2.7rem;
    }
  }
  ul {
    width: 80%;
    li {
      border: 1px solid black;
      background-color: #292929;
      list-style: none;
      margin-block: 0.5rem;
      width: 100%;
      .faq-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem;
        font-size: 1.4rem;
        font-weight: 400;
        margin: 0;
        border-bottom: 1.5px solid black;
        cursor: pointer;
        transition-duration: 250ms;
        transition-property: background-color;
        transition-timing-function: cubic-bezier(0.9, 0, 0.51, 1);
        .rotate {
          transform: rotate(-45deg);
          transition: transform 0.25s ease-in-out;
        }
      }
      .faq-item:hover{
        background-color: #4e4e4e;
      }
      .show-faq {
        overflow: hidden;
        visibility: visible;
        padding: 0 1.5rem;
        font-size: 1.2rem;
        font-weight: 300;
        transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1);
        max-height: 75rem;
        padding-bottom: 1.5rem;
        padding-top: 1.5rem;
      }
      .faq-content {
        overflow: hidden;
        max-height: 0;
        padding: 0 1.5rem;
        visibility: collapse;
        transition: all 0.25s cubic-bezier(0.5, 0, 0.1, 1);
      }
    }
  }
`;
export default Signup;