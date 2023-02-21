import { useContext } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AboutUs from '../pages/AboutUs';
import AdminOnly from '../pages/AdminOnly';
import Advertising from '../pages/Advertising';
import AlnColors from '../pages/AlnColors';
import Category from '../pages/Category';
import Contact from '../pages/Contact';
import CreateAccount from '../pages/CreateAccount';
import EditProfile from '../pages/EditProfile';
import Home from '../pages/Home';
import Jobs from '../pages/Jobs';
import Landing from '../pages/Landing';
import Logout from '../pages/Logout';
import Marketing from '../pages/Marketing';
import Network from '../pages/Network';
import NotFound from '../pages/NotFound';
import PrivacyPolicy from '../pages/PrivacyPolicy';
import Profile from '../pages/Profile';
import SearchResults from '../pages/SearchResults';
import Settings from '../pages/Settings';
import TermsOfService from '../pages/TermsOfService';
import UploadVideo from '../pages/UploadVideo';
import UserSearchResults from '../pages/UserSearchResults';
import { AuthContext } from '../providers/AuthProvider';
import { FirebaseContext } from '../providers/FirebaseProvider';
import ProtectedRoutes from '../providers/ProtectedRoutes';
import { LoginForm } from './LoginForm';
import Navbar from './Navbar';
import ScrollToTop from './ScrollToTop';

export const RestOfApp = () => {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;
  const authContext = useContext(AuthContext);
  const user = authContext.user;
  const userRoles = authContext.userRoles;
  console.log('roles', userRoles, user);
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/color' element={<AlnColors />} />
        <Route path='/home' element={<Navbar />}>
          <Route
            index
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path='network'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Network />
              </ProtectedRoutes>
            }
          />
          {/* <Route
            path='videos'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Videos />
              </ProtectedRoutes>
            }
          /> */}
          <Route
            path='Category'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Category />
              </ProtectedRoutes>
            }
          />
          <Route
            path='Category/:category'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Category />
              </ProtectedRoutes>
            }
          />
          <Route
            path='Category/:category/:country'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Category />
              </ProtectedRoutes>
            }
          />
          <Route
            path='uploadvideo'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <UploadVideo />
              </ProtectedRoutes>
            }
          />
          <Route
            path='settings'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route
            path='admin'
            element={
              <ProtectedRoutes isAllowed={!!user && userRoles.admin}>
                <AdminOnly />
              </ProtectedRoutes>
            }
          />
          <Route
            path='admin/:tool'
            element={
              <ProtectedRoutes isAllowed={!!user && userRoles.admin}>
                <AdminOnly />
              </ProtectedRoutes>
            }
          />
          <Route path='logout' element={<Logout />} />
          {/* <Route path='Donate' element={<Donate />} /> */}
          <Route path='LoginForm' element={<LoginForm />} />
          <Route path='editprofile' element={<EditProfile />} />
          <Route path='CreateAccount' element={<CreateAccount />} />

          <Route
            path='profile'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path='profile/:profileId'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route path='*' element={<NotFound />} />
          <Route
            path='result'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <SearchResults />
              </ProtectedRoutes>
            }
          />
          <Route path='*' element={<NotFound />} />
          <Route
            path='userResult'
            element={
              <ProtectedRoutes isAllowed={!!user}>
                <UserSearchResults />
              </ProtectedRoutes>
            }
          />

          <Route path='Marketing' element={<Marketing />} />
          <Route path='Advertising' element={<Advertising />} />
          <Route path='AboutUs' element={<AboutUs />} />
          <Route path='Contact' element={<Contact />} />
          <Route path='Jobs' element={<Jobs />} />
          <Route path='TermsOfService' element={<TermsOfService />} />
          <Route path='PrivacyPolicy' element={<PrivacyPolicy />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
