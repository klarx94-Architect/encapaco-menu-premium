import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCmNCdyuy7hLpiuQ2k1rPJUy-251GPGj8A",
  authDomain: "encapaco-menu.firebaseapp.com",
  projectId: "encapaco-menu",
  storageBucket: "encapaco-menu.firebasestorage.app",
  messagingSenderId: "1073419660674",
  appId: "1:1073419660674:web:48b400b41d39bc7f13f39b"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
