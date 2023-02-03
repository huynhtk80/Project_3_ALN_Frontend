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

  const onClickSaveV= async(e) => {
    e.preventDefault();
    setAuthErrorV(false)
    const valid = validateFields();
    if(valid){
    const isLoggedin = await loginFn(email, password);
    if (isLoggedin){
    console.log("it's working!")  
    navigate('/home', { replace: true });
    }else {
      setAuthErrorV(true)
    }
    }
  }
  
  const [validationMsgV, setValidationMsgV] = useState({
    email:"",
    password: "",
    passwordV: ""
  
  })
  
    const [errorStateV, setErrorStateV] = useState({
    email: false,
    password: false,
    passwordV: false,

  })
  const [authErrorV, setAuthErrorV] = useState(false)

  console.log("error", errorStateV)

  const validateFields =()=>{
    const validationV = {
      email:"",
      password:"",
      passwordV: ""}
      
    const errorsV = {
      email: false,
      password: false,
      confirmPassword: false,
  
    }

    let isValid= true;

    if(!email){
      console.log("we got a email error")
      validationV.email= "Email is required"
      errorsV.email = true
      isValid =false;
    }

    if (email && !/\S+@\S+.\S+/.test(email)){
      // console.log("we got a email error")
      validationV.email= "Email format needs to be example@email.com"
      errorsV.email = true
      isValid =false;
    }

    if(!password ){
      console.log("we got a password error")
      validationV.password= "Password is required"
      errorsV.password = true
      isValid =false;
    }

    
    if(!passwordV ){
      console.log("we got a password error")
      validationV.password= "Password is required"
      errorsV.password = true
      isValid =false;
    }

    if(!passwordV === !password ){
      console.log("we got a password error")
      validationV.password= "Password does not match"
      errorsV.password = true
      isValid =false;
    }

    if(password && password.length <6){
      console.log(password.length)
      console.log("we got a password error")
      validationV.password= "Password is needs to be 6 charaters"
      errorsV.password = true
      isValid =false;
    }

    setErrorStateV(errorsV)
    setValidationMsgV(validationV)

    return isValid;

    


  }



  

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
                <br></br>
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
                  placeholder='Password'
                
                />
                <br></br>
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
                  placeholder='Confirm Password'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                className='group relative flex w-full justify-center rounded-md border border-transparent bg-secondary py-2 px-4 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                onClick={onClickSaveV}
              >
                <span className='absolute inset-y-0 left-0 flex items-center pl-3'></span>
                Create Account
              </button>
              <br></br>
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