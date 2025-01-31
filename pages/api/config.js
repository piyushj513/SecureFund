import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
const firebaseConfig = {
  apiKey: 'AIzaSyDt79TsvnmkTuT1VM9KGh9IJmtZPKkUCBk',
  authDomain: 'fund-5669a.firebaseapp.com',
  projectId: 'fund-5669a',
  storageBucket: 'fund-5669a.appspot.com',
  messagingSenderId: '45558280754',
  appId: '1:45558280754:web:cfe90cfa7a57717973422b',
  measurementId: 'G-PS7EXQVR75',
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
