import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, User, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

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
export const db = getFirestore(app);

export const createAuthUser = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(firebaseAuth, email, password);
};

export const signinAuthUser = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(firebaseAuth, email, password);
};

export const signOutUser = async () => await signOut(firebaseAuth);

export const onAuthStateChangedListener = (callback: (user: User | null) => void) => {
  onAuthStateChanged(firebaseAuth, callback);
};

export const createUserDocFromAuth = async (userAuth: User, aditionalInfo = {}) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        email,
        createdAt,
        ...aditionalInfo
      });
    } catch (error) {
      console.log(error);
    }
  }

  return userDocRef;
};

