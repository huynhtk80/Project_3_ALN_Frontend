import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import ALN_LOGO_3_45 from '../assets/ALN_LOGO-3-45.png';

export const CreateAccount = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const createUser = authContext.createUser;
  const user = authContext.user;
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [passwordV, setpasswordV] = useState('');

  const navigate = useNavigate();

  // if (user) {
  //   navigate('/home/', { replace: true });
  //   return <h1>Already Logged In Redirecting</h1>;
  // }
  if (user) {
    return <Navigate to='/home/' replace />;
  }

  return (
    <>
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8 mt-40 shadow-xl p-6 bg-slate-100'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src={ALN_LOGO_3_45}
              alt='ALN'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-gray-900'>
              Create your account
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
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='passwordV'
                  name='passwordV'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  value={password}
                  onChange={(e) => setpasswordV(e.target.value)}
                  placeholder='**********'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={async (e) => {
                  e.preventDefault();
                  try {
                    const isCreated = await createUser(email, password);
                    if (isCreated) navigate('/home/Signin', { replace: true });
                  } catch (e) {
                    console.log(e);
                  }
                }}
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
                Create Account
              </button>
              <div className='text-sm'>
                <Link
                  to='/home/loginform'
                  className='font-medium text-indigo-600 hover:text-indigo-500'
                >
                  Already Have an account?
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateAccount;
