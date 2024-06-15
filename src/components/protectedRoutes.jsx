import { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function PrivateRoute({
  children,
  allowedRoles = []
}) {
  const navigate = useNavigate();
  const[isAuthenticated, setIsAuthenticated] = useState(false)
  const [role, setRole] = useState(null);  
  const [decoded, setDecoded] = useState(null)

  useEffect(() =>{
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const decodedToken = jwtDecode(token);
          const isExpired = Date.now() > decodedToken.exp * 1000;
          console.log("token type:",decodedToken.type);
          setDecoded(decodedToken)
        if (isExpired) {
          logout(decoded); // Token expired, log out
          return;
        }
        setRole(decodedToken.role);
        setIsAuthenticated(true);
        } catch (error) {
          console.error('Invalid token:', error);
          logout(decoded); // Invalid token, log out
        }
        
      }
      
    }, []);
    const logout = (decodedToken) => {
      if (decodedToken.type === 'user') {
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/');
      } else {
        setIsAuthenticated(false);
        setRole(null);
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        navigate('/admin');
      }
    };

    if (!isAuthenticated) {
      return <h1>Not Authenticated</h1>; // Display message when not authenticated
    }
  
    // Role-Based Access Control Logic
    if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
      return <h1>Unauthorized: Insufficient Privileges</h1>; // Display message for unauthorized roles
    }



    return children;
}
 