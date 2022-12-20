import "./App.css";
import { FirebaseContext, FirebaseProvider } from "./providers/FirebaseProvider";
import { RestOfApp } from "./components/RestOfApp";


function App() {
  return (
    <FirebaseProvider>
      <RestOfApp />
    </FirebaseProvider>
  );
 }
      

      
  
  
  


export default App;
