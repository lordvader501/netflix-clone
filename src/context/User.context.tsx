import React, { createContext, useEffect, useState } from 'react';
import { User } from 'firebase/auth';
import { createUserDocFromAuth, onAuthStateChangedListener } from '../utils/firebase';

interface UserProps {
  currUser: User | null;
  setCurrUser:React.Dispatch<React.SetStateAction<User | null>>;
}

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserContext = createContext<UserProps>({
  currUser:null,
  setCurrUser: () => null
});

export const UserProvider:React.FC<UserProviderProps> = ({children}) => {
  const [currUser, setCurrUser] = useState<User | null>(null);
  const value:UserProps = {currUser, setCurrUser};

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user:User | null) => {
      if (user) {
        await createUserDocFromAuth(user);
      }
      setCurrUser(user);
    });

    return unsubscribe;
  },[]);

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
