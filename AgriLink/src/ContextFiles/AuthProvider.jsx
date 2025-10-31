// src/ContextFiles/AuthProvider.jsx
import React, { useEffect, useState } from "react";
import { AuthContext } from "./AllContext";

const parseJSON = (str) => {
  try { return JSON.parse(str); } catch { return null; }
};

export default function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [user, setUser] = useState(() => parseJSON(localStorage.getItem("user")));
  const [userId, setUserId] = useState(() => {
    const id = localStorage.getItem("userId");
    if (id) return isNaN(id) ? id : Number(id);
    const u = parseJSON(localStorage.getItem("user"));
    return u?.id ?? u?.pk ?? null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState(() => Boolean(localStorage.getItem("token")));

  useEffect(() => {
    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [token]);

  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");
  }, [user]);

  useEffect(() => {
    if (userId !== null && userId !== undefined) localStorage.setItem("userId", String(userId));
    else localStorage.removeItem("userId");
  }, [userId]);

  useEffect(() => {
    if (isLoggedIn) localStorage.setItem("isLoggedIn", "1");
    else localStorage.removeItem("isLoggedIn");
  }, [isLoggedIn]);

  const login = ({ token: newToken, user: newUser }) => {
    setToken(newToken ?? null);
    setUser(newUser ?? null);
    const id = newUser?.id ?? newUser?.pk ?? null;
    setUserId(id);
    setIsLoggedIn(Boolean(newToken));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    setUserId(null);
    setIsLoggedIn(false);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider value={{
      token,
      user,
      userId,
      isLoggedIn,
      setUser,
      setUserId,
      setToken,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  );
}
























// import React, { Children, useState } from 'react'
// import { AuthContext } from './AllContext'

// function AuthProvider({children}) {
// const [userId, setUserId] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const login = (id) => {
//     setUserId(id);
//     setIsLoggedIn(true);
//   };

//   const logout = () => {
//     setUserId(null);
//     setIsLoggedIn(false);
//   };
//   return (    
//     <>
//     <AuthContext.Provider value={{ userId, isLoggedIn, setUserId, login, logout }}>
//         {children}
//     </AuthContext.Provider>
//     </>
//   )
// }

// export default AuthProvider