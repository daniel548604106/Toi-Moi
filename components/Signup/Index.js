import React, { useState, useEffect } from 'react';
import {
  QuestionMarkCircleIcon,
  ExclamationCircleIcon,
  XIcon
} from '@heroicons/react/solid';
import _ from 'lodash';
import { apiPostSignup } from '../../api';
import catchErrors from '../../utils/catchErrors';
const Index = ({ setSignupOpen }) => {
  const currentYear = new Date().getFullYear();
  const yearRange = _.range(currentYear, 1930);
  const monthRange = _.range(1, 12);
  const dateRange = _.range(1, 31);
  const [inputChecked, setInputChecked] = useState(false);
  const [errorMsg, setErrorMsg] = useState({});
  const [signupInfo, setSignupInfo] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: '',
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
    passwordConfirm,
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

  const handleSignup = (e) => {
    e.preventDefault();
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
    if (!passwordConfirm) {
      error['passwordConfirm'] = 'Please confirm your password';
    }
    setErrorMsg(error);
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
      if (passwordConfirm) {
        setErrorMsg({ ...errorMsg, passwordConfirm: '' });
      }
    }
    console.log(errorMsg, 'ser');
  }, [signupInfo]);
  useEffect(() => {
    console.log(signupInfo);
  }, [signupInfo]);

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="relative bg-white shadow-lg rounded-lg w-full max-w-[500px]"
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
            className="w-full focus:outline-none bg-white"
            type="text"
            name="name"
            placeholder="Name"
          />
          {errorMsg.name && (
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
              className="w-full focus:outline-none bg-white"
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
          <div
            className={`flex  p-3 items-center rounded-lg border ${
              errorMsg.passwordConfirm && 'border-red-600'
            }`}
          >
            <input
              className="w-full focus:outline-none"
              type="password"
              onChange={(e) => handleInputChange(e)}
              name="passwordConfirm"
              placeholder="Confirm password"
            />
            {errorMsg.passwordConfirm && (
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
              onChange={(e) => handleGender(e)}
              type="radio"
              id="female"
              name="gender"
              value="female"
            />
          </div>
          <div className="w-full p-2 rounded-md ml-[10px] flex items-center justify-between border">
            <label onChange={(e) => handleGender(e)} htmlFor="male">
              Male
            </label>

            <input
              onChange={(e) => handleGender(e)}
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
          <span className="text-blue-600 cursor-pointer">Service policy</span>{' '}
          and{' '}
          <span className="text-blue-600 cursor-pointer">Cookie policy</span>
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => handleSignup(e)}
            className="text-lg font-semibold bg-green-400 text-white rounded-md w-[200px] p-2 mx-auto"
          >
            SIGN UP
          </button>
        </div>
      </div>
    </form>
  );
};

export default Index;
