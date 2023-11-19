import {
  createContext,
  useEffect,
  useState,
  ReactNode,
  useContext,
} from "react";

import { getUser } from "../actions/user";

interface User {
  username: string;
  email: string;
  _id: string;
  // Add other user-related information if needed
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  user: null,
});

function AuthContextProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        setIsAuthenticated(false);
        const email = localStorage.getItem("email") || "";
        const info = await getUser(email);
        console.log(info);
        if (info) {
          setUser(info.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // Handle errors gracefully, log for debugging
        setIsAuthenticated(false);
        console.error("Authentication error:", error);
      }
    };

    checkAuthentication();
  }, []);

  const value: AuthContextType = {
    isAuthenticated,
    user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
function useAuth() {
  return useContext(AuthContext);
}

export { AuthContextProvider, useAuth };
