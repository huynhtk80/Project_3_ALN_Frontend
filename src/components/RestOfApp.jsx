import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from '../pages/Landing';
import Profile from '../pages/Profile';
import Home from '../pages/Home';
import { FirebaseContext } from '../providers/FirebaseProvider';
import Navbar from './Navbar';
import Network from '../pages/Network';
import Videos from '../pages/Documentaries';
import Settings from '../pages/Settings';
import Logout from '../pages/Logout';
import NotFound from '../pages/NotFound';
import { AuthContext } from '../providers/AuthProvider';
import { LoginForm } from './LoginForm';
import UploadVideo from '../pages/UploadVideo';
import Signin from '../pages/Signin';
import Category from '../pages/Category';
import SearchResults from '../pages/SearchResults';
import CreateAccount from './CreateAccount';

export const RestOfApp = () => {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/home' element={<Navbar />}>
          <Route index element={<Home />} />
          <Route path='Profile' element={<Profile />} />
          <Route path='network' element={<Network />} />
          <Route path='videos' element={<Videos />} />
          <Route path='Category' element={<Category />} />
          <Route path='Category/:category' element={<Category />} />
          <Route path='uploadvideo' element={<UploadVideo />} />
          <Route path='settings' element={<Settings />} />
          <Route path='logout' element={<Logout />} />
          <Route path='LoginForm' element={<LoginForm />} />
          <Route path='Signin' element={<Signin />} />
          <Route path='CreateAccount' element={<CreateAccount />} />
          <Route path='*' element={<NotFound />} />
          <Route path='result' element={<SearchResults />} />
         
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
