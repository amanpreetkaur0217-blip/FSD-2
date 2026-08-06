import { createContext, useContext, useEffect, useState } from "react";
import { useUsers } from "./UserContext";
import {
    generateToken,
    decodeToken,
    isTokenExpired,
} from "../utils/jwt";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const { users } = useUsers();

    const [user, setUser] = useState(null);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) return;

        if (isTokenExpired(token)) {
            logout();
            return;
        }

        const decoded = decodeToken(token);
        setUser(decoded);

        const remaining = decoded.exp - Date.now();

        const timer = setTimeout(() => {
            logout();
            alert("Session Expired");
        }, remaining);

        return () => clearTimeout(timer);

    }, []);

    const login = (username, password) => {

        const foundUser = users.find(
            (u) =>
                u.username === username &&
                u.password === password
        );

        if (!foundUser) {
            return false;
        }

        const token = generateToken(foundUser);

        localStorage.setItem("token", token);

        setUser(decodeToken(token));

        return true;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);