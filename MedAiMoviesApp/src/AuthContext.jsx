import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    const login = (name) => {
        setIsLoggedIn(true);
        setUsername(name);
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
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
