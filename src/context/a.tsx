import React, { createContext, useEffect, useReducer, Reducer } from 'react';
import { User } from 'firebase/auth';
import { createUserDocFromAuth, onAuthStateChangedListener } from '../utils/firebase';

interface UserProps {
  currUser: User | null;
  setCurrUser:(user: User) => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}


export const USER_ACTION_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
};
const userReducer = (state: UserProps, action: { type: string; payload: User }): UserProps => {
  const {type, payload} = action;
  switch(type) {
  case USER_ACTION_TYPES.SET_CURRENT_USER:
    return {
      ...state,
      currUser: payload
    };
  default:
    throw new Error(`Unhanded type ${type} in userReducer`);
  }
};
const INITIAL_STATE: UserProps = {
  currUser: null,
  setCurrUser: () => {} 
};
export const UserContext = createContext<UserProps>(INITIAL_STATE);


export const UserProvider:React.FC<UserProviderProps> = ({children}) => {
  const [{currUser}, dispatch] = useReducer<Reducer<UserProps, { type: string; payload: User }>>(userReducer,INITIAL_STATE);
  
  const setCurrUser = (user:User) => {
    dispatch({type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user});
  };
  const value:UserProps = {currUser, setCurrUser};

  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener(async (user:User | null) => {
      if (user) {
        await createUserDocFromAuth(user);
        setCurrUser(user);
        console.log(user);
      }
    });

    return unsubscribe;
  },[]);

  return (
    <UserContext.Provider value={value}>{children}</UserContext.Provider>
  );
};
