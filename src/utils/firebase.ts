// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyC1UyYJ0uv48zhLZzdak6iLEuI4SgjvTrA',
  authDomain: 'netfilx-clone-63bb2.firebaseapp.com',
  projectId: 'netfilx-clone-63bb2',
  storageBucket: 'netfilx-clone-63bb2.appspot.com',
  messagingSenderId: '979515990025',
  appId: '1:979515990025:web:6f6c48eeb13fb55a7dd8d8',
  measurementId: 'G-8LDNNS900W'
};

const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);
