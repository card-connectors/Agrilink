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
 // New state for userName:
 const [userName, setUserName] = useState(() => {
  const u = parseJSON(localStorage.getItem("user"));
  return u?.name || null;
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

 // Store userName in localStorage too
 useEffect(() => {
  if (userName) localStorage.setItem("userName", userName);
  else localStorage.removeItem("userName");
 }, [userName]);

 useEffect(() => {
  if (isLoggedIn) localStorage.setItem("isLoggedIn", "1");
  else localStorage.removeItem("isLoggedIn");
 }, [isLoggedIn]);

 const login = ({ token: newToken, user: newUser }) => {
  setToken(newToken ?? null);
  setUser(newUser ?? null);
  const id = newUser?.id ?? newUser?.pk ?? null;
  setUserId(id);
  setUserName(newUser?.name ?? null);  // Set userName here
  setIsLoggedIn(Boolean(newToken));
 };

 const logout = () => {
  setToken(null);
  setUser(null);
  setUserId(null);
  setUserName(null);
  setIsLoggedIn(false);
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  localStorage.removeItem("isLoggedIn");
 };

 return (
  <AuthContext.Provider value={{
   token,
   user,
   userId,
   userName,       // Provide userName
   isLoggedIn,
   setUser,
   setUserId,
   setUserName,   // Provide setUserName
   setToken,
   login,
   logout
  }}>
   {children}
  </AuthContext.Provider>
 );
}
