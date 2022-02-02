import './App.css';

// import { initializeApp } from "firebase/app";
// import {getAuth} from'firebase/auth';
// import {getFirestore} from 'firebase/firestore';

import {useAuthState} from 'react-firebase-hooks/auth';
import Auth from './Auth';
import Main from './Main';
import { auth } from './FirebaseConfig';



function App() {
  const [user, loading, error] = useAuthState(auth);
  return (
    
    <div className="App">
      <header className="App-header">
        {auth.currentUser?<Main/>:<Auth/>}
      </header>
    </div>
  );
}

export default App;
