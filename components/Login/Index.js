import React, { useState, useEffect } from 'react';
import { apiPostLogin } from '../../api/index';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/slices/userSlice';
import { useRouter } from 'next/router';
import catchErrors from '../../utils/catchErrors';
import Cookie from 'js-cookie';
import Signup from '../Signup/Index';
import Image from 'next/image';
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState('');
  const [isSignupOpen, setSignupOpen] = useState(false);
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
      dispatch(setUserLogin(data.user));
      Cookie.set('token', data.token);
      router.push('/');
    } catch (error) {
      const errMsg = catchErrors(error);
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
      <div className="w-full max-w-md mb-[20px] md:mb-0">
        <Image src="/facebook_logo.svg" width={400} height={100} />
        <h2 className="text-2xl  font-semibold">
          Connect with friends and the world around you on Facebook.
        </h2>
      </div>
      <div className="p-5 rounded-md text-center bg-white shadow-md w-full max-w-[450px]">
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
          <button
            onClick={(e) => handleLogin(e)}
            className="rounded-md w-full text-lg p-3 bg-blue-600 text-white"
          >
            Login
          </button>
        </form>
        <span className="inline-block text-blue-600 my-[20px] cursor-pointer text-md">
          Forgot Password?
        </span>
        <hr />
        <button
          onClick={() => setSignupOpen(true)}
          className="p-3 bg-green-500 cursor-pointer my-[20px] text-white rounded-md text-lg"
        >
          Create Account
        </button>
      </div>
      {error !== '' && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Login;
