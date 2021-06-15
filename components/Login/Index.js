import React, { useState, useEffect } from 'react';
import { apiPostLogin } from '../../api/index';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/slices/userSlice';
import { useRouter } from 'next/router';
import catchErrors from '../../utils/catchErrors';
import Cookie from 'js-cookie';
const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [error, setError] = useState('');

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
    <div className="w-screen h-screen flex  items-center justify-center px-2">
      <div className="p-5 rounded-md text-center bg-white shadow-md w-full max-w-[500px]">
        <form className="w-full">
          <div className="mb-5 ">
            <input
              name="email"
              onChange={(e) => handleLoginInput(e)}
              className="w-full  block mt-2 p-3 text-lg rounded-sm border"
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
              className="block w-full mt-2 p-3 text-lg rounded-sm border"
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
            登入
          </button>
        </form>
        <span className="inline-block text-blue-600 my-[20px] cursor-pointer text-md">
          忘記密碼？
        </span>
        <hr />
        <button className="p-3 bg-green-500 cursor-pointer my-[20px] text-white rounded-md text-lg">
          建立帳號
        </button>
      </div>
      {error !== '' && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default Login;
