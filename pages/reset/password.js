import React, { useState, useEffect } from 'react';
import router from 'next/router';
import Image from 'next/image';
import catchError from '../../lib/catchError';
import { apiPostPasswordReset } from '../../api/index';
const password = () => {
  const token = router.query.token;
  const [error, setError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [newPasswordSuccess, setNewPasswordSuccess] = useState(false);
  const handleResetPassword = async () => {
    if (!password || !passwordConfirm)
      return setError('Missing required field');
    if (password !== passwordConfirm)
      return setError("Password and password confirm doesn't match");
    try {
      const res = await apiPostPasswordReset(token, password);
      console.log(res);
      setNewPasswordSuccess(true);
    } catch (error) {
      console.log(error);
      setError(catchError(error));
    }
  };
  useEffect(() => {
    setError('');
  }, [password, passwordConfirm]);
  return (
    <div className=" flex top-0 left-0 items-center flex-col bg-gray-100 justify-center p-3 w-screen h-screen fixed">
      <div className="w-full max-w-[450px] flex items-center justify-center flex-col">
        <Image
          src="/toi&moi-logo.svg"
          className="max-w-[100px] sm:w-[400px]"
          width={400}
          height={120}
        />
        <div className="rounded-lg bg-white text-center  space-y-3 border w-full max-w-[600px]  shadow-xl p-5 bg-secondary text-secondary">
          {newPasswordSuccess ? (
            <h2 className="text-lg sm:text-xl font-semibold mb-3">
              Changed Successfully
            </h2>
          ) : (
            <h2 className="text-xl sm:text-2xl font-semibold mb-3">
              Password Reset
            </h2>
          )}
          {newPasswordSuccess ? (
            <Image src="/images/password-success.svg" width={60} height={60} />
          ) : (
            <Image src="/images/password-reset.svg" width={60} height={60} />
          )}
          {!newPasswordSuccess && (
            <>
              <div
                className={`p-3 rounded-lg border ${error && 'border-red-600'}`}
              >
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="Password"
                  className="focus:outline-none w-full"
                />
              </div>
              <div
                className={`p-3 rounded-lg border ${error && 'border-red-600'}`}
              >
                <input
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                  type="password"
                  placeholder="Confirm Password"
                  className="focus:outline-none w-full"
                />
              </div>{' '}
            </>
          )}
          {error && <p className="text-red-600 text-sm">{error}</p>}
          {newPasswordSuccess ? (
            <button
              onClick={() => router.push('/')}
              className="bg-green-500 focus:outline-none text-secondary p-3 py-2 mt-[10px] rounded-lg"
            >
              Login{' '}
            </button>
          ) : (
            <button
              onClick={() => handleResetPassword()}
              className="bg-main text-white text-sm sm:text-lg focus:outline-none text-secondary  p-3 rounded-lg"
            >
              Reset Password
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default password;
