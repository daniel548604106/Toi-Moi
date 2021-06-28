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
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
 
 const SignupSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Please use your real name')
     .max(50, 'Too Long!')
     .required('Required'),
  username: Yup.string()
     .min(2, 'Username must be at least 2 characters')
     .max(50, 'Too Long!')
     .required('Required'),
   email: Yup.string().email('Invalid email').required('Required'),
   password: Yup.string()
   .min(6, 'Password must be at least 6 characters')
   .max(20, 'Too Long!')
   .required('Required'),
 });
const Index = ({ setSignupOpen }) => {
  const dispatch = useDispatch();
  const currentYear = new Date().getFullYear();
  const [isLoading, setLoading] = useState(false);
  const yearRange = _.range(currentYear, 1930);
  const monthRange = _.range(1, 13);
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

  const handleBirthdayChange = (e) => {
    setSignupInfo({
      ...signupInfo,
      birthday: { ...signupInfo.birthday, [e.target.name]: e.target.value }
    });
  };

  const handleSignup = async (e) => {

    let error = {};
    setInputChecked(true);
    // Name
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

  return (
    <form
      onClick={(e) => e.stopPropagation()}
      className="h-screen sm:h-auto bg-white relative shadow-lg rounded-lg  w-screen  sm:w-full sm:max-w-[500px]"
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
       initialValues={{
         name: '',
         username: '',
         email: '',
         password: '',
         gender: 'male'
       }}
       validationSchema={SignupSchema}
       onSubmit={values => {
        e.preventDefault();
        e.stopPropagation();
        console.log(values);
       }}
     >
       {({ errors, touched }) => (
         <Form className="space-y-3">
           <div className={`border p-3 rounded-md flex items-center w-full ${errors.name && touched.name && 'border-red-600'}`}>
           <Field placeholder="Name" className="w-full outline-none"  name="name" />
           {errors.name && touched.name && <ExclamationCircleIcon className="h-6 text-red-600"/> }
           </div>
           <div className="text-red-600 text-sm">
           {errors.name && touched.name ? (
             <div>{errors.name}</div>
           ) : null}
           </div>
           <div className={`border p-3 rounded-md flex items-center w-full ${errors.username && touched.username && 'border-red-600'}`}>
           <Field placeholder="Username" className="w-full outline-none"  name="username" />
           {errors.username && touched.username && <ExclamationCircleIcon className="h-6 text-red-600"/> }
           </div>
           <div className="text-red-600 text-sm">
           {errors.username && touched.username ? (
             <div>{errors.username}</div>
           ) : null}
           </div>
           <div className={`border p-3 rounded-md flex items-center w-full ${errors.email && touched.email && 'border-red-600'}`}>
             <Field placeholder="Email" className="w-full outline-none" name="email" type="email" />
             {errors.email && touched.email && <ExclamationCircleIcon className="h-6 text-red-600"/> }
           </div>
           <div className="text-red-600 text-sm">
           {errors.email && touched.email ? (
             <div>{errors.email}</div>
           ) : null}
           </div>
           <div className={`border p-3 rounded-md flex items-center w-full ${errors.password && touched.password && 'border-red-600'}`}>
           <Field placeholder="Password" className="w-full outline-none" name="password" type="password" />
           {errors.password && touched.password && <ExclamationCircleIcon className="h-6 text-red-600"/> }
           </div>
           <div className="text-red-600 text-sm">
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
           ) : null}
           </div>
           <div>
            <div id="gender-group">Gender</div>
            <div className="flex items-center mt-1" role="group" aria-labelledby="gender-group">
              <div className="flex border p-2 rounded-md w-full items-center justify-between">
                <label>                Male
                </label>
                <Field type="radio" name="gender" value="male" />
              </div>
              <div className="flex border p-2 rounded-md w-full ml-2 items-center justify-between">
              <label>
                Female
              </label>
                <Field type="radio" name="gender" value="female" />
                </div>
              <div className="flex border p-2 rounded-md w-full ml-2 items-center justify-between">
              <label>
                Other
              </label>
                <Field type="radio" name="gender" value="other" />
              </div>
            </div>
           </div>

         </Form>
       )}
     </Formik>
        <p className="my-[20px] text-xs sm:text-sm text-gray-600">
          By clicking <span className="underline">Signup</span> means you've
          agreed to our{' '}
          <span className="text-main cursor-pointer">Service policy</span> and{' '}
          <span className="text-main cursor-pointer">Cookie policy</span>
        </p>
        <div className="flex items-center justify-center">
          <button
            onClick={(e) => handleSignup(e)}
            className="text-md flex items-center justify-center sm:text-lg font-semibold bg-main-yellow text-white text-secondary rounded-md w-[200px] p-2 mx-auto"
          >
            {isLoading ? <Loader /> : 'SIGN UP'}{' '}
          </button>
          </div>
          </div>
    </form>
  );
};

export default Index;
