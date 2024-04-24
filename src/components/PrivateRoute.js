import React from 'react'
import {  Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//Contains a private route so that only logged in users can acces the site
export default function PrivateRoute({ children }) {
    const { currentUser } = useAuth();
  
    return currentUser ? children : <Navigate to="/login" />;
  }