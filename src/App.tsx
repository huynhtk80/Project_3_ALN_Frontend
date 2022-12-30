import "./App.css";
import { FirebaseProvider } from "./providers/FirebaseProvider";
import { RestOfApp } from "./components/RestOfApp";
import { AuthProvider } from "./providers/AuthProvider";


function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
       <RestOfApp />
      </AuthProvider>
    </FirebaseProvider>
  );
 }
      

      
  
  
  


export default App;
