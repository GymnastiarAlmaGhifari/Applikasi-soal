import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

export interface AuthPayload {
  authToken: string;
  data: {
    id: string;
    name: string;
    email: string;
  };
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: AuthPayload | null;
  login: (authData: AuthPayload) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<AuthPayload | null>(null);

  useEffect(() => {
    // Check token in local storage when the app loads
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${parsedUser.authToken}`;
      console.log("User loaded from local storage:", parsedUser); // Debugging
    }
  }, []);

  const login = (authData: AuthPayload) => {
    localStorage.setItem("user", JSON.stringify(authData));
    setUser(authData);
    axios.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${authData.authToken}`;
    console.log("User logged in:", authData); // Debugging
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    console.log("User logged out"); // Debugging
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn: !!user, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
