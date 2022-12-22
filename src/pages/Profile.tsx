import React, { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";

function Profile() {
  const fbContext = useContext(FirebaseContext);
  const app = fbContext.app;
  return (
    <div>
      <h1>My Profile</h1>
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
