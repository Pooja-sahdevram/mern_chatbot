import React from 'react'
import {
    createContext,
    useContext,
    useEffect,
    useState,
  } from "react";
  import { loginUser, checkAuthStatus, logoutUser, signupUser} from '../helpers/api-communicator';


// Define User type
const User = {
    name: '',
    email: ''
  };
  

  
const AuthContext = createContext(null);
export const AuthProvider =({ children }) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
  
    useEffect(() => {
        // fetch if the user's cookies are valid then skip login
         async function checkStatus() {
         const data = await checkAuthStatus();
         if (data) {
             setUser({ email: data.email, name: data.name });
             setIsLoggedIn(true);
         }
        }
        checkStatus();
      }, []);
      const login = async (email, password) => {
        const data = await loginUser(email, password);
        console.log(data);
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      };
      const signup = async (name , email, password) => {
        const data = await signupUser(name, email, password);
        if (data) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      };
      const logout = async () => {
        await logoutUser();
        setIsLoggedIn(false);
        setUser(null);
        window.location.reload();
      };
    
      const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
      };
      return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
    };
    
    export  const useAuth = () => useContext(AuthContext);