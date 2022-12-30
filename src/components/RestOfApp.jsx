import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Profile from "../pages/Profile";
import Home from "../pages/Home";
import { FirebaseContext } from "../providers/FirebaseProvider";
import Navbar from "./Navbar";
import Network from "../pages/Network";
import Videos from "../pages/Videos";
import Settings from "../pages/Settings";
import Logout from "../pages/Logout";
import NotFound from "../pages/NotFound";
import { AuthContext } from "../providers/AuthProvider";
import { LoginForm } from "./LoginForm";

export const RestOfApp = () => {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;
  const authContext = useContext(AuthContext);
  const user = authContext.user
  
  return (
   
    
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="network" element={<Network />} />
            <Route path="videos" element={<Videos />} />
            <Route path="settings" element={<Settings />} />
            <Route path="logout" element={<Logout />} />
            <Route path="LoginForm" element={<LoginForm />} />
            <Route path="*" element={<NotFound />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    
  );
};


