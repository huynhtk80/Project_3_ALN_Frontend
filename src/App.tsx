import './App.css';
import { FirebaseProvider } from './providers/FirebaseProvider';
import { RestOfApp } from './components/RestOfApp';
import { AuthProvider } from './providers/AuthProvider';
import { UserDBProvider } from './providers/UserDBProvider';

function App() {
  return (
    <FirebaseProvider>
      <AuthProvider>
        <UserDBProvider>
          <RestOfApp />
        </UserDBProvider>
      </AuthProvider>
    </FirebaseProvider>
  );
}

export default App;
