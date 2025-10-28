import React, { Children, useState } from 'react'
import { AuthContext } from './AllContext'

function AuthProvider({children}) {
const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (id) => {
    setUserId(id);
    setIsLoggedIn(true);
  };

  const logout = () => {
    setUserId(null);
    setIsLoggedIn(false);
  };
  return (    
    <>
    <AuthContext.Provider value={{ userId, isLoggedIn, login, logout }}>
        {children}
    </AuthContext.Provider>
    </>
  )
}

export default AuthProvider