import React, { useState, useEffect } from 'react';
import {
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
  XIcon
} from '@heroicons/react/solid';
import Loader from '../Global/Loader';
import _ from 'lodash';
import { apiPostSignup } from '../../api';
import catchError from '../../lib/catchError';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/slices/userSlice';
const Index = ({ setSignupOpen }) => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const [isLoading, setLoading] = useState(false);
  const yearRange = _.range(currentYear, 1930);
  const monthRange = _.range(1, 12);
  const dateRange = _.range(1, 31);
  const [inputChecked, setInputChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    username: '',
    email: '',
    password: '',
    birthday: {
      year: '',
      month: '',
      date: ''
    },
    gender: '',
    genderDisplayName: ''
  });

  const {
    name,
    email,
    password,
    username,
    birthday: { year, month, date },
    gender,
    genderDisplayName
  } = signupInfo;

  const handleInputChange = (e) => {
    const { value, name } = e.target;
    setSignupInfo({
      ...signupInfo,
      [name]: value
    });
  };

  const handleBirthdayChange = (e) => {
    setSignupInfo({
      ...signupInfo,
      birthday: { ...signupInfo.birthday, [e.target.name]: e.target.value }
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let error = {};
    setInputChecked(true);
    // Name

    if (!name) {
      error['name'] = 'Cannot be empty';
    }
    // Email
    if (!email) {
      error['email'] = 'Please provide your email';
    }
    // Password
    if (!password) {
      error['password'] = 'Please provide a password';
    }
    // Username
    if (!username) {
      error['username'] = 'Please confirm your password';
    }
    // Gender
    if (!gender) {
      error['gender'] = 'Please provide your gender';
    }
    // BDay
    if (!year || !month || !date) {
      error['birthday'] = 'Please make sure you have the right birthday';
    }
    setErrorMsg(error);
    try {
      setLoading(true);
      const { data } = await apiPostSignup(signupInfo);
      dispatch(setUserLogin(data.user));
      Cookie.set('token', data.token);
      router.push('/');
      setLoading(false);
      setSignupOpen(false);
    } catch (error) {
      setLoading(false);
      catchError(error);
    }
  };

  useEffect(() => {
    // Check latest input after submit button is clicked
    console.log(inputChecked);
    if (inputChecked) {
      if (name) {
        setErrorMsg({ ...errorMsg, name: '' });
      }
      if (email) {
        setErrorMsg({ ...errorMsg, email: '' });
      }
      if (password) {
        setErrorMsg({ ...errorMsg, password: '' });
      }
      if (username) {
        setErrorMsg({ ...errorMsg, username: '' });
      }
      if (gender) {
        setErrorMsg({ ...errorMsg, gender: '' });
      }
      if (year && date && month) {
        setErrorMsg({ ...errorMsg, birthday: '' });
      }
    }
    console.log(errorMsg, 'ser');
  }, [signupInfo]);
  useEffect(() => {
    console.log(signupInfo);
    if (year && month && date) {
      let formattedBirthday = new Date(year, month, date);
      formattedBirthday = formattedBirthday.toISOString();
      setSignupInfo({ ...signupInfo, birthday: formattedBirthday });
    }
  }, [signupInfo]);

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="bg-white relative shadow-lg rounded-lg w-full max-w-[500px]"
    >
      <span
        onClick={() => setSignupOpen(false)}
        className="absolute rounded-full border border-gray-600 text-gray-600 top-5 right-5 p-2 cursor-pointer "
      >
        <XIcon className="h-6" />
      </span>
      <div className="p-5 border-b">
        <h1 className="text-3xl font-semibold">Signup</h1>
        <p className="text-sm text-gray-400">Fast and simple</p>
      </div>
      <div className="p-5 space-y-2">
        <div
          className={`flex  p-3 items-center rounded-lg border ${
            errorMsg.name && 'border-red-600'
          }`}
        >
          <input
            onChange={(e) => handleInputChange(e)}
            className="w-full focus:outline-none bg-secondary text-secondary"
            type="text"
            name="name"
            placeholder="Name"
          />
          {errorMsg.name && (
            <ExclamationCircleIcon className="h-6 text-red-500" />
          )}
        </div>
        <div
          className={`flex  p-3 items-center rounded-lg border ${
            errorMsg.username && 'border-red-600'
          }`}
        >
          <input
            className="w-full focus:outline-none"
            type="text"
            onChange={(e) => handleInputChange(e)}
            name="username"
            placeholder="Account"
          />
          {errorMsg.username && (
            <ExclamationCircleIcon className="h-6 text-red-500" />
          )}
        </div>
        <div className="space-y-2">
          <div
            className={`flex  p-3 items-center rounded-lg border ${
              errorMsg.email && 'border-red-600'
            }`}
          >
            <input
              onChange={(e) => handleInputChange(e)}
              className="w-full focus:outline-none bg-secondary text-secondary"
              type="email"
              name="email"
              value={signupInfo.email}
              placeholder="Email"
            />
            {errorMsg.email && (
              <ExclamationCircleIcon className="h-6 text-red-500" />
            )}
          </div>
          <div
            className={`flex  p-3 items-center rounded-lg border ${
              errorMsg.password && 'border-red-600'
            }`}
          >
            <input
              onChange={(e) => handleInputChange(e)}
              className="w-full focus:outline-none"
              type="password"
              name="password"
              value={signupInfo.password}
              placeholder="Password"
            />
            {errorMsg.password && (
              <ExclamationCircleIcon className="h-6 text-red-500" />
            )}
          </div>
        </div>
        <div className="flex items-center text-gray-600">
          <span>Birthday</span>
          <QuestionMarkCircleIcon className="h-5  cursor-pointer ml-[5px]" />
        </div>

        <div className=" flex items-center w-full">
          <select
            onChange={(e) => handleBirthdayChange(e)}
            className="w-full text-sm  border p-2 rounded-md"
            name="year"
          >
            {yearRange.map((year) => (
              <option key={year}>{year}</option>
            ))}
          </select>
          <select
            onChange={(e) => handleBirthdayChange(e)}
            className="w-full  text-sm border p-2 rounded-md ml-[10px] "
            name="month"
          >
            {monthRange.map((month) => (
              <option key={month}>{month}</option>
            ))}
          </select>
          <select
            onChange={(e) => handleBirthdayChange(e)}
            className="w-full  text-sm border p-2 rounded-md ml-[10px] "
            name="date"
          >
            {dateRange.map((date) => (
              <option key={date}>{date}</option>
            ))}
          </select>
        </div>
        <div className="text-gray-600">
          <span>Gender</span>
        </div>
        <div className="flex items-center">
          <div className="w-full p-2 rounded-md flex items-center justify-between border">
            <label htmlFor="female">Female</label>
            <input
              onChange={(e) => handleInputChange(e)}
              type="radio"
              id="female"
              name="gender"
              value="female"
            />
          </div>
          <div className="w-full p-2 rounded-md ml-[10px] flex items-center justify-between border">
            <label onChange={(e) => handleInputChange(e)} htmlFor="male">
              Male
            </label>

            <input
              onChange={(e) => handleInputChange(e)}
              type="radio"
              id="male"
              name="gender"
              value="male"
            />
          </div>{' '}
          <div className="w-full p-2 rounded-md ml-[10px] flex items-center justify-between border">
            <label htmlFor="other">Other</label>
            <input type="radio" id="other" name="gender" value="other" />
          </div>
        </div>
        <p className="mb-[20px] text-sm text-gray-600">
          By clicking <span className="underline">Signup</span> means you've
          agreed to our{' '}
          <span className="text-main cursor-pointer">Service policy</span> and{' '}
          <span className="text-main cursor-pointer">Cookie policy</span>
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => handleSignup(e)}
            className="text-lg font-semibold bg-main-yellow text-white text-secondary rounded-md w-[200px] p-2 mx-auto"
          >
            {isLoading ? <Loader /> : 'SIGN UP'}{' '}
          </button>
        </div>
      </div>
    </form>
  );
};

export default Index;
