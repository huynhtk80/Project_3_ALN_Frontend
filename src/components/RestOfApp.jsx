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
import CreateAccount from '../pages/CreateAccount';
import ProtectedRoutes from '../providers/ProtectedRoutes';

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
          <Route
            index
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path='network'
            element={
              <ProtectedRoutes>
                <Network />
              </ProtectedRoutes>
            }
          />
          <Route
            path='videos'
            element={
              <ProtectedRoutes>
                <Videos />
              </ProtectedRoutes>
            }
          />
          <Route
            path='Category'
            element={
              <ProtectedRoutes>
                <Category />
              </ProtectedRoutes>
            }
          />
          <Route
            path='Category/:category'
            element={
              <ProtectedRoutes>
                <Category />
              </ProtectedRoutes>
            }
          />
          <Route
            path='uploadvideo'
            element={
              <ProtectedRoutes>
                <UploadVideo />
              </ProtectedRoutes>
            }
          />
          <Route
            path='settings'
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route path='logout' element={<Logout />} />
          <Route path='LoginForm' element={<LoginForm />} />
          <Route path='Signin' element={<Signin />} />
          <Route path='CreateAccount' element={<CreateAccount />} />
          <Route path='*' element={<NotFound />} />
          <Route
            path='result'
            element={
              <ProtectedRoutes>
                <SearchResults />
              </ProtectedRoutes>
            }
          />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
