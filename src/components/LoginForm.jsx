import React, { useContext, useState } from 'react';
import { AuthContext } from '../providers/AuthProvider';

export const LoginForm = () => {
  const authContext = useContext(AuthContext);
  const loginFn = authContext.login;
  const logoutFn = authContext.logout;
  const user = authContext.user;
  const [email, setEmail] = useState('');
  const [password, setpassword] = useState('');
  return (
    <div className=''>
      {!user ? (
        <>
          <input
            className='border border-black rounded m-1 p-1'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className='border border-black rounded m-1 p-1'
            name='password'
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
          <br />
          <button
            className='bg-sky-700 hover:bg-sky-900 text-white font-bold py-2 px-4 rounded'
            onClick={() => loginFn(email, password)}
          >
            LOGIN
          </button>
        </>
      ) : (
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => logoutFn()}
        >
          LOG OUT
        </button>
      )}
    </div>
  );
};
