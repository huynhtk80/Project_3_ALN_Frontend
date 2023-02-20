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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  const [passwordV, setpasswordV] = useState('');
  const navigate = useNavigate();
  const [authError, setAuthError] = useState(false);
  const [authErrorMsg, setAuthErrorMSG] = useState(false);

  const onClickSaveV = async (e: any) => {
    e.preventDefault();
    setErrorState({ ...errorState, auth: false });
    const valid = validateFields();
    if (valid) {
      const isLoggedin = await createUser(email, password, firstName, lastName);
      if (isLoggedin === 'success') {
        console.log("it's working!");
        navigate('/home/editprofile', { replace: true });
      } else {
        setAuthError(true);
        setAuthErrorMSG(isLoggedin);
      }
    }
  };

  const [validationMsg, setValidationMsg] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordV: '',
    auth: '',
  });

  const [errorState, setErrorState] = useState({
    email: false,
    firstName: false,
    lastName: false,
    password: false,
    passwordV: false,
    auth: false,
  });
  const [authErrorV, setAuthErrorV] = useState(false);

  console.log('error', errorState);

  const validateFields = () => {
    const validationV = {
      email: '',
      firstName: '',
      lastName: '',
      password: '',
      passwordV: '',
      auth: '',
    };

    const errorsV = {
      email: false,
      firstName: false,
      lastName: false,
      password: false,
      passwordV: false,
      auth: false,
    };

    let isValid = true;

    if (!firstName) {
      validationV.firstName = 'First Name is required';
      errorsV.firstName = true;
      isValid = false;
    }

    if (!lastName) {
      validationV.lastName = 'Last Name is required';
      errorsV.lastName = true;
      isValid = false;
    }

    if (!email) {
      validationV.email = 'Email is required';
      errorsV.email = true;
      isValid = false;
    }

    if (email && !/\S+@\S+.\S+/.test(email)) {
      validationV.email = 'Email format needs to be example@email.com';
      errorsV.email = true;
      isValid = false;
    }

    if (!password) {
      console.log('we got a password error');
      validationV.password = 'Password is required';
      errorsV.password = true;
      isValid = false;
    }

    if (!passwordV) {
      console.log('we got a password error');
      validationV.password = 'Password is required';
      errorsV.password = true;
      isValid = false;
    }

    if (!(passwordV === password)) {
      console.log('we got a password error');
      validationV.password = 'Password does not match';
      errorsV.password = true;
      isValid = false;
    }

    if (password && password.length < 6) {
      console.log(password.length);
      console.log('we got a password error');
      validationV.password = 'Password is needs to be 6 charaters';
      errorsV.password = true;
      isValid = false;
    }

    setErrorState(errorsV);
    setValidationMsg(validationV);

    return isValid;
  };

  // if (user) {
  //   navigate('/home/', { replace: true });
  //   return <h1>Already Logged In Redirecting</h1>;
  // }
  if (user) {
    return <Navigate to='/home/Category' replace />;
  }

  return (
    <>
      <div className='flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8'>
        <div className='w-full max-w-md space-y-8 mt-40 shadow-xl p-6 bg-primary rounded-lg'>
          <div>
            <img
              className='mx-auto h-12 w-auto'
              src={ALN_LOGO_3_45}
              alt='ALN'
            />
            <h2 className='mt-6 text-center text-3xl font-bold tracking-tight text-base-content'>
              Create your account
            </h2>
          </div>
          <form className='mt-8 space-y-6' action='#' method='POST'>
            <input type='hidden' name='remember' defaultValue='true' />
            <div className='-space-y-px rounded-md shadow-sm'>
              <div>
                <label htmlFor='firstName' className='sr-only'>
                  Email address
                </label>
                <input
                  id='firstName'
                  name='firstName'
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder='First Name'
                  className='relative block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
                {errorState.firstName && (
                  <p className='text-red-600'>{validationMsg.firstName}</p>
                )}
                <label htmlFor='lastName' className='sr-only'>
                  Email address
                </label>
                <input
                  id='lastName'
                  name='lastName'
                  required
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder='Last Name'
                  className='relative block w-full appearance-none mt-2 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
                {errorState.lastName && (
                  <p className='text-red-600'>{validationMsg.lastName}</p>
                )}
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
                  className='relative block w-full appearance-none mt-2 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                />
                {errorState.email && (
                  <p className='text-red-600'>{validationMsg.email}</p>
                )}
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
                  className='relative block w-full appearance-none mt-2 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  placeholder='Password'
                />

                {errorState.password && (
                  <p className='text-red-600'>{validationMsg.password}</p>
                )}
                <label htmlFor='password' className='sr-only'>
                  Password
                </label>
                <input
                  id='passwordV'
                  name='passwordV'
                  type='password'
                  autoComplete='current-password'
                  required
                  className='relative block w-full appearance-none mt-2 rounded-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm'
                  value={passwordV}
                  onChange={(e) => setpasswordV(e.target.value)}
                  placeholder='Confirm Password'
                />
                {errorState.passwordV && (
                  <p className='text-red-600'>{validationMsg.password}</p>
                )}
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center  rounded-md border border-transparent bg-primary-content py-2 px-4 text-sm font-medium text-primary  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={onClickSaveV}
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
                Create Account
              </button>
              {authError && <p className='text-red-600'>{authErrorMsg}</p>}
              <br></br>
              <div className='text-sm '>
                <Link
                  to='/home/loginform'
                  className='font-medium text-primary-content hover:font-bold'
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
