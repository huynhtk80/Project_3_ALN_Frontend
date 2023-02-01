import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';

export const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const user = authContext.user;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');

  return (
    <>
      <div className='flex min-h-full items-center justify-center  py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8 mt-40 shadow-xl p-6 bg-primary rounded-lg'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src='/src/assets/ALN_LOGO-3-45.png'
              alt='ALN'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-primary-content'>
              Sign in to your account
            </h2>
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label htmlFor='email-address' className='sr-only'>
                  Email address
                </label>
                <input
                  id='email-address'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder='email@example.com'
                  className='relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
              </div>
              <div>
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder='**********'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500'
                />
                <label
                  htmlFor='remember-me'
                  className='ml-2 block text-sm text-primary-content'
                >
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a href='#' className='font-medium text-primary-content'>
                  Forgot your password?
                </a>
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary-content py-2 px-4 text-sm font-medium text-primary'
                onClick={(e) => {
                  e.preventDefault();
                  loginFn(email, password);
                  navigate('/home', { replace: true });
                }}
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
                Sign in
              </button>
              <div className='text-sm'>
                <Link
                  to='/home/CreateAccount'
                  className='font-medium text-primary-content'
                >
                  Register for an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
