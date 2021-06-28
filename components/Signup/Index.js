import React, { useState, useEffect, useRef } from 'react';
import { ExclamationCircleIcon, XIcon } from '@heroicons/react/solid';
import Loader from '../Global/Loader';
import _ from 'lodash';
import { apiPostSignup } from '../../api';
import catchError from '../../lib/catchError';
import Cookie from 'js-cookie';
import { useDispatch } from 'react-redux';
import { setUserLogin } from '../../redux/slices/userSlice';
import { Formik, Form, Field } from 'formik';
import router from 'next/router';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Please use your real name')
    .max(50, 'Too Long!')
    .required('Required'),
  account: Yup.string()
    .min(2, 'account must be at least 2 characters')
    .max(50, 'Too Long!')
    .required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .max(20, 'Too Long!')
    .required('Required')
});
const Index = ({ setSignupOpen }) => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const [isLoading, setLoading] = useState(false);
  const yearRange = _.range(currentYear, 1930);
  const monthRange = _.range(1, 13);
  const dateRange = _.range(1, 32);
  const [errorMsg, setErrorMsg] = useState('');
  const [birthdayError, setBirthdayError] = useState('');
  const formRef = useRef();

  const handleSignup = async (e) => {
    e.preventDefault();
    const { name, account, email, gender, password, year, month, date } =
      formRef.current.values;

    if (!year || !month || !date) {
      return setBirthdayError('Please fill in your correct birthday');
    }

    const birthday = new Date(year, month - 1, date).toISOString();
    const signupInfo = {
      name,
      username: account,
      email,
      password,
      birthday,
      gender
    };
    try {
      setLoading(true);
      const { data } = await apiPostSignup(signupInfo);
      Cookie.set('token', data.token);
      dispatch(setUserLogin(data.user));
      setLoading(false);
      setSignupOpen(false);
      router.push('/');
    } catch (error) {
      setLoading(false);
      setErrorMsg(catchError(error));
    }
  };

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className="h-screen overflow-y-auto sm:h-auto bg-white relative shadow-lg rounded-lg  w-screen  sm:w-full sm:max-w-[500px]"
    >
      <span
        onClick={() => setSignupOpen(false)}
        className="absolute rounded-full border border-gray-600 text-gray-600 top-5 right-5 p-2 cursor-pointer "
      >
        <XIcon className="h-4  sm:h-6" />
      </span>
      <div className="p-3  sm:p-5 border-b">
        <h1 className="text-xl sm:text-3xl font-semibold">Signup</h1>
        <p className="text-sm text-gray-400">Fast and simple</p>
      </div>

      <div className="p-5">
        <Formik
          innerRef={formRef}
          initialValues={{
            name: '',
            account: '',
            email: '',
            password: '',
            gender: 'male',
            year: '',
            month: '',
            date: ''
          }}
          validationSchema={SignupSchema}
        >
          {({ errors, touched, isValid, dirty }) => (
            <Form className="space-y-3">
              {errorMsg && (
                <div className="w-full p-3 rounded-md bg-red-600 text-white">
                  {errorMsg}
                </div>
              )}
              <div
                className={`border p-3 rounded-md flex items-center w-full ${
                  errors.name && touched.name && 'border-red-600'
                }`}
              >
                <Field
                  placeholder="Name"
                  className="w-full outline-none"
                  name="name"
                />
                {errors.name && touched.name && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-red-600 text-sm">
                {errors.name && touched.name ? <div>{errors.name}</div> : null}
              </div>
              <div
                className={`border p-3 rounded-md flex items-center w-full ${
                  errors.account && touched.account && 'border-red-600'
                }`}
              >
                <Field
                  placeholder="Account"
                  className="w-full outline-none"
                  name="account"
                />
                {errors.account && touched.account && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-red-600 text-sm">
                {errors.account && touched.account ? (
                  <div>{errors.account}</div>
                ) : null}
              </div>
              <div
                className={`border p-3 rounded-md flex items-center w-full ${
                  errors.email && touched.email && 'border-red-600'
                }`}
              >
                <Field
                  placeholder="Email"
                  className="w-full outline-none"
                  name="email"
                  type="email"
                />
                {errors.email && touched.email && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-red-600 text-sm">
                {errors.email && touched.email ? (
                  <div>{errors.email}</div>
                ) : null}
              </div>
              <div
                className={`border p-3 rounded-md flex items-center w-full ${
                  errors.password && touched.password && 'border-red-600'
                }`}
              >
                <Field
                  placeholder="Password"
                  className="w-full outline-none"
                  name="password"
                  type="password"
                />
                {errors.password && touched.password && (
                  <ExclamationCircleIcon className="h-6 text-red-600" />
                )}
              </div>
              <div className="text-red-600 text-sm">
                {errors.password && touched.password ? (
                  <div>{errors.password}</div>
                ) : null}
              </div>
              <div>
                <div className="flex items-center justify-between">
                  <div id="Birthday">Birthday</div>
                  {birthdayError && (
                    <div className="text-red-600 text-xs">{birthdayError}</div>
                  )}
                </div>
                <div className="flex items-center mt-1">
                  <Field
                    className={`w-full bg-white p-2 outline-none border rounded-md ${
                      birthdayError ? 'border-red-600' : ''
                    }`}
                    as="select"
                    name="year"
                  >
                    {yearRange.map((year) => (
                      <option value={year}>{year}</option>
                    ))}
                  </Field>
                  <Field
                    className={`w-full bg-white p-2 ml-[10px] outline-none border rounded-md ${
                      birthdayError ? 'border-red-600' : ''
                    }`}
                    as="select"
                    name="month"
                  >
                    {monthRange.map((month) => (
                      <option value={month}>{month}</option>
                    ))}
                  </Field>
                  <Field
                    className={`w-full bg-white p-2 ml-[10px] outline-none border rounded-md ${
                      birthdayError ? 'border-red-600' : ''
                    }`}
                    as="select"
                    name="date"
                  >
                    {dateRange.map((date) => (
                      <option value={date}>{date}</option>
                    ))}
                  </Field>
                </div>
              </div>
              <div>
                <div id="gender-group">Gender</div>
                <div
                  className="flex items-center mt-1"
                  role="group"
                  aria-labelledby="gender-group"
                >
                  <div className="flex border p-2 rounded-md w-full items-center justify-between">
                    <label> Male</label>
                    <Field type="radio" name="gender" value="male" />
                  </div>
                  <div className="flex border p-2 rounded-md w-full ml-2 items-center justify-between">
                    <label>Female</label>
                    <Field type="radio" name="gender" value="female" />
                  </div>
                  <div className="flex border p-2 rounded-md w-full ml-2 items-center justify-between">
                    <label>Other</label>
                    <Field type="radio" name="gender" value="other" />
                  </div>
                </div>
              </div>

              <p className="my-[20px] text-xs sm:text-sm text-gray-600">
                By clicking <span className="underline">Signup</span> means
                you've agreed to our{' '}
                <span className="text-main cursor-pointer">Service policy</span>{' '}
                and{' '}
                <span className="text-main cursor-pointer">Cookie policy</span>
              </p>
              <div className="flex items-center justify-center">
                <button
                  disabled={!(isValid && dirty)}
                  onClick={(e) => handleSignup(e)}
                  className={`text-md mb-10 flex items-center justify-center sm:text-lg font-semibold  text-white text-secondary rounded-md w-[200px] p-2 mx-auto ${
                    !(isValid && dirty)
                      ? 'bg-gray-100 text-black cursor-not-allowed'
                      : 'bg-main-yellow'
                  }`}
                >
                  {isLoading ? <Loader /> : 'SIGN UP'}{' '}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Index;
