import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDHSqiyzezTgO1RpuxSZLuR9QjONXfsO8M",
  authDomain: "gameslibrary-b6956.firebaseapp.com",
  projectId: "gameslibrary-b6956",
  storageBucket: "gameslibrary-b6956.appspot.com",
  messagingSenderId: "190523205352",
  appId: "1:190523205352:web:75685ee0e9f00178fa8b5d"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);