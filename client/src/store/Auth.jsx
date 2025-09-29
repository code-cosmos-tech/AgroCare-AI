import React, { useState, useEffect, createContext, useContext } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken") || "");
    const [isAdmin, setIsAdmin] = useState(false); 
    const [userData, setUserData] = useState({ 
        username: "",
        email: "",
        phone: "",
        password: ""
    });

    const tokenBearer = "Bearer " + token;
    const URL = "https://agrocare-ai-server.onrender.com";
    const isLoggedIn = !!token;

    const AuthenticateUser = async () => {
        if (!token) return;
        
        try {
            const res = await fetch(`${URL}/api/user`, {
                method: "GET",
                headers: {
                    "Authorization": tokenBearer
                }
            });

            const data = await res.json();

            if (res.ok) {
                setUserData(data);
                setIsAdmin(data.isAdmin || false);
            }
            return data
        } catch (error) {
            console.error("Authentication failed:", error);
        }
    }

    useEffect(() => {
        AuthenticateUser();
    }, []);

    const setUserToken = (token) => {
        setToken(token);
        localStorage.setItem("accessToken", token);
    }

    const logout = () => {
        setUserData({});
        setToken("");
        setIsAdmin(false);
        localStorage.removeItem("accessToken");
    }

    const contextValue = {
        logout,
        setUserToken,
        userData,
        AuthenticateUser,
        setUserData,
        tokenBearer,
        isLoggedIn,
        URL,
        isAdmin,
        token,
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
