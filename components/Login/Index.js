import React, { useState, useEffect } from 'react';
import { apiPostLogin } from '../../api/index';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/slices/userSlice';
import { useRouter } from 'next/router';
import catchError from '../../lib/catchError';
import Cookie from 'js-cookie';
import Signup from '../Signup/Index';
import Image from 'next/image';
import ForgotPassword from '../ForgotPassword/Index';
import Loader from '../Global/Loader';
const Login = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  });
  const handleLoginInput = (e) => {
    setError('');
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInput.account === '' || loginInput.password === '') return;
    try {
      setLoading(true);
      const { data } = await apiPostLogin(loginInput);
      Cookie.set('token', data.token);
      dispatch(setUserLogin(data.user));
      setLoading(false);
      router.push('/');
    } catch (error) {
      const errMsg = catchError(error);
      setLoading(false);
      setError(errMsg);
    }
  };
  useEffect(() => {
    const userEmail = Cookie.get('userEmail');
    if (userEmail) {
      setLoginInput({ ...loginInput, email: userEmail });
    }
    setShowNotifications(true);
  }, []);
  return (
    <div className="w-full flex-col justify-center md:flex-row max-w-5xl mx-auto h-screen flex  items-center md:justify-between px-5">
      {isSignupOpen && (
        <div
          onClick={() => setSignupOpen(false)}
          className="fixed top-0 z-50 left-0 flex w-screen h-screen items-center justify-center bg-opacity-20 bg-black"
        >
          <Signup setSignupOpen={setSignupOpen} />
        </div>
      )}
      {isForgotPasswordOpen && (
        <div
          onClick={() => setForgotPasswordOpen(false)}
          className="fixed top-0 z-50 left-0 flex w-screen h-screen items-center justify-center bg-opacity-20 bg-black"
        >
          <ForgotPassword />
        </div>
      )}

      <div className="w-full max-w-md mb-[20px] md:mb-0">
        <img
          className="w-[300px] mx-auto sm:mx-0 h-[100px] sm:w-[400px] sm:h-[200px]"
          src="/toi&moi-logo.svg"
          alt="logo"
        />
        <h2 className="text-md sm:text-2xl  font-semibold">
          Connect with friends and the world around you on Toi&Moi.
        </h2>
      </div>

      <div className="relative p-3 sm:p-5 bg-white rounded-md text-center bg-secondary text-secondary shadow-md w-full max-w-[450px]">
        <div className={`${showNotifications && ' hiInterviewerBg'} `}>
          <div className="dialogue absolute  bg-white border p-2 rounded-lg">
            <span className="ball"></span>
            <p className="whitespace-nowrap">
              <span className="shakeHand">👋</span>{' '}
              <span className="ml-[5px]">Hi Dear Guest!</span>
            </p>
          </div>
        </div>
        <form className="w-full space-y-2 sm:space-y-3">
          <div className="">
            <input
              name="email"
              onChange={(e) => handleLoginInput(e)}
              className="w-full text-md  block mt-2 p-3 sm:text-lg rounded-md border"
              id="account"
              value={loginInput.email}
              type="email"
              placeholder="Account"
            />
          </div>
          <div className="">
            <input
              name="password"
              onChange={(e) => handleLoginInput(e)}
              className="block  text-md w-full mt-2 p-3 sm:text-lg rounded-md border"
              id="password"
              type="password"
              value={loginInput.password}
              placeholder="Password"
            />
          </div>
          {error !== '' && (
            <div className="text-sm sm:text-md text-red-500 my-3 relative ">
              {error}
            </div>
          )}
          <button
            onClick={(e) => handleLogin(e)}
            className="rounded-md focus:outline-none outline-none flex items-center justify-center w-full text-md sm:text-lg p-2 sm:p-3 text-white bg-main text-secondary"
          >
            {loading ? <Loader /> : 'Login'}
          </button>
        </form>
        <span
          onClick={() => setForgotPasswordOpen(true)}
          className="text-sm sm:text-md inline-block text-main my-[20px] cursor-pointer text-md"
        >
          Forgot Password?
        </span>
        <hr />
        <button
          onClick={() => setSignupOpen(true)}
          className="text-white  text-md sm:text-lg p-3 bg-main-yellow cursor-pointer my-3 sm:my-4 text-secondary rounded-md"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
