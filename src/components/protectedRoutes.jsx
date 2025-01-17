
import React, { createContext, useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";

const AuthContext = createContext();

export default function PrivateRoute({
  children,
  allowedRoles = []
}) {
  const navigate = useNavigate();
  const[isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState(null);  

  useEffect(() =>{
      const token = localStorage.getItem('token');
      if (!token) {
        // Jika token tidak ada di localStorage
        Swal.fire({
          icon: 'warning',
          title: 'Anda harus Login!',
          text: 'Anda akan diarahkan ke halaman login.',
          confirmButtonText: 'OK',
        }).then(() => {
          navigate('/admin'); // Arahkan ke halaman login
        });
        return;
      }

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const isExpired = Date.now() > decodedToken.exp * 1000;
        if (isExpired) {
          setIsAuthenticated(false);
          setRole(null);
          localStorage.removeItem('token');
          localStorage.removeItem('role');; // Token expired, log out
          return;
        }
        setRole(decodedToken.role);
        setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid token:', error);
          setIsAuthenticated(false);
          setRole(null);
          localStorage.removeItem('token');
          localStorage.removeItem('role');; // Invalid token, log out
        }
      }
      
    }, []);

    

    if (!isAuthenticated) {
      return <h1>Not Authenticated</h1>; // Display message when not authenticated
    }
  
    // Role-Based Access Control Logic
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return <h1>Unauthorized: Insufficient Privileges</h1>; // Display message for unauthorized roles
    }



    return (
      <AuthContext.Provider value={role}>
          {children}
      </AuthContext.Provider>
    ) 
    
}
 