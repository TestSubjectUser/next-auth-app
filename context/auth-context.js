import { createContext, useState, useContext, useEffect } from "react";

// Create Context
const AuthContext = createContext();

// Create Provider
export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState(null);

  useEffect(() => {
    // Check if auth data exists in localStorage or cookies
    const savedData = localStorage.getItem("authData");
    if (savedData) {
      setAuthData(JSON.parse(savedData));
    }
  }, []);

  const setAuth = (data) => {
    setAuthData(data);
    localStorage.setItem("authData", JSON.stringify(data)); // Store in localStorage
  };

  const clearAuth = () => {
    setAuthData(null);
    localStorage.removeItem("authData"); // Clear from localStorage
  };

  return (
    <AuthContext.Provider value={{ authData, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

// Custom hook to use Auth context
export function useAuth() {
  return useContext(AuthContext);
}
