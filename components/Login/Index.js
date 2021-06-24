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
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSignupOpen, setSignupOpen] = useState(false);
  const [isForgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [loginInput, setLoginInput] = useState({
    email: '',
    password: ''
  });
  const handleLoginInput = (e) => {
    const { name, value } = e.target;
    setLoginInput({ ...loginInput, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loginInput.account === '' || loginInput.password === '') return;
    try {
      const { data } = await apiPostLogin(loginInput);
      console.log('login', data);
      if (!data || !data.user || !data.token) return console.log('error');
      dispatch(setUserLogin(data.user));
      Cookie.set('token', data.token);
      router.push('/');
    } catch (error) {
      const errMsg = catchError(error);
      setError(errMsg);
    }
  };
  useEffect(() => {
    const userEmail = Cookie.get('userEmail');
    if (userEmail) {
      console.log(userEmail);
      setLoginInput({ ...loginInput, email: userEmail });
    }
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
        <Image src="/toi&moi-logo.svg" width={400} height={100} />
        <h2 className="text-2xl  font-semibold">
          Connect with friends and the world around you on Toi&Moi.
        </h2>
      </div>
      <div className="p-5 bg-white rounded-md text-center bg-secondary text-secondary shadow-md w-full max-w-[450px]">
        <form className="w-full">
          <div className="mb-5 ">
            <input
              name="email"
              onChange={(e) => handleLoginInput(e)}
              className="w-full  block mt-2 p-3 text-lg rounded-md border"
              id="account"
              value={loginInput.email}
              type="email"
              placeholder="Account"
            />
          </div>
          <div className="mb-5">
            <input
              name="password"
              onChange={(e) => handleLoginInput(e)}
              className="block w-full mt-2 p-3 text-lg rounded-md border"
              id="password"
              type="password"
              value={loginInput.password}
              placeholder="Password"
            />
          </div>
          {error !== '' && (
            <div className="text-red-500 my-3 relative ">{error}</div>
          )}
          <button
            onClick={(e) => handleLogin(e)}
            className="rounded-md w-full text-lg p-3 text-white bg-main text-secondary"
          >
            Login
          </button>
        </form>
        <span
          onClick={() => setForgotPasswordOpen(true)}
          className="inline-block text-main my-[20px] cursor-pointer text-md"
        >
          Forgot Password?
        </span>
        <hr />
        <button
          onClick={() => setSignupOpen(true)}
          className="p-3 text-white bg-main-yellow cursor-pointer my-[20px] text-secondary rounded-md text-lg"
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
