import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { AuthContext } from "../providers/AuthProvider";
import { LoginForm } from "../components/LoginForm";


function Profile() {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;
  const authContext = useContext(AuthContext);
  const user = authContext.user
  return (
    <div>
      <h1>My Profile</h1>
      <div className='App'>
      {user ? 'you are logged in!' : 'not logged in!'}
      <LoginForm />
    </div>
      <div className="App">
        Firebase app info:
        <br />
        <br />
        {JSON.stringify(fbContext.app)}
      </div>
    </div>
  );
}

export default Profile;
