import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import ALN_LOGO_3_45 from '../assets/ALN_LOGO-3-45.png';

export const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const user = authContext.user;
  const navigate = useNavigate();
  const [email, setEmail] = useState(null);
  const [password, setpassword] = useState(null);
  const [validationMsg, setValidationMsg] = useState({
    email: '',
    password: '',
  });
  const [errorState, setErrorState] = useState({
    email: false,
    password: false,
  });
  const [authError, setAuthError] = useState(false);

  console.log('error', errorState);

  const validateFields = () => {
    const validation = {
      email: '',
      password: '',
    };
    const errors = {
      email: false,
      password: false,
    };

    let isValid = true;

    if (!email) {
      console.log('we got a email error');
      validation.email = 'Email is required';
      errors.email = true;
      isValid = false;
    }

    if (email && !/\S+@\S+.\S+/.test(email)) {
      // console.log("we got a email error")
      validation.email = 'Email format needs to be example@email.com';
      errors.email = true;
      isValid = false;
    }

    if (!password) {
      console.log('we got a password error');
      validation.password = 'Password is required';
      errors.password = true;
      isValid = false;
    }

    if (password && password.length < 6) {
      console.log(password.length);
      console.log('we got a password error');
      validation.password = 'Password is needs to be 6 charaters';
      errors.password = true;
      isValid = false;
    }

    setErrorState(errors);
    setValidationMsg(validation);

    return isValid;
  };

  const onClickSave = async (e) => {
    e.preventDefault();
    setAuthError(false);
    const valid = validateFields();
    if (valid) {
      const isLoggedin = await loginFn(email, password);
      if (isLoggedin) {
        console.log("it's working!");
        navigate('/home', { replace: true });
      } else {
        setAuthError(true);
      }
    }
  };

  return (
    <>
      <div className='flex min-h-full items-center justify-center  py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8 mt-40 shadow-xl p-6 bg-primary rounded-lg'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src={ALN_LOGO_3_45}
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
                  className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
                {errorState.email && (
                  <p className='text-red-600'>{validationMsg.email}</p>
                )}
              </div>
              <br />
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
                  className='relative block w-full appearance-none  rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder='**********'
                />
                {errorState.password && (
                  <p className='text-red-600'>{validationMsg.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-primary-content py-2 px-4 text-sm font-medium text-primary'
                onClick={onClickSave}
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
                Sign in
              </button>
              <br />
              {authError && (
                <p className='text-red-800'>Credentials not matching</p>
              )}

              <div className='flex items-center justify-between hover:font-bold'>
                {/* <div className='flex items-center'>
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
              </div> */}
                <div className='text-sm'>
                  <Link
                    to='/home/CreateAccount'
                    className='font-medium text-primary-content hover:font-bold'
                  >
                    Register for an account?
                  </Link>
                </div>

                <div className='text-sm'>
                  <a
                    href='#'
                    className='font-medium text-primary-content hover:font-bold'
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
