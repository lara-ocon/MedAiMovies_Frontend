import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    console.log(AuthContext);
    console.log(useContext(AuthContext));
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(null);  // Agregar userId al estado

    /*
    const login = (name) => {
        setIsLoggedIn(true);
        setUsername(name);
    };
    */
    const login = (userDetails) => {
        setIsLoggedIn(true);
        setUsername(userDetails.username);
        setUserId(userDetails.userId);  // Guardar userId proporcionado por el backend
    };

    const logout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/logout/', {
                method: 'DELETE',
                credentials: 'include', // Para asegurar que se envíen las cookies
            });
            console.log('logour response:', response);
            if (response.ok) {
                setIsLoggedIn(false);
                setUsername('');
                setUserId(null);  // Limpiar userId
                localStorage.removeItem('token');
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userId, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
