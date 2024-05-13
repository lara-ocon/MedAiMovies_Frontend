import React, { createContext, useState, useContext, useEffect} from 'react';

const AuthContext = createContext(null);

export function useAuth() {
    console.log(AuthContext);
    console.log(useContext(AuthContext));
    return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [userId, setUserId] = useState(0);  // Agregar userId al estado
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

    const deleteAccount = async () => {
        console.log('deleteAccount');
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/me/', {
                method: 'DELETE',
                credentials: 'include',
            });
            if (response.ok) {
                setIsLoggedIn(false);
                setUsername('');
                setUserId(null);
                localStorage.removeItem('token');
            } else {
                console.error('Failed to delete account');
            }
        }
        catch (error) {
            console.error('Error deleting account:', error);
        }
    };

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await fetch('http://127.0.0.1:8000/api/users/me/', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        credentials: 'include',
                    });
                    if (response.ok) {
                        const data = await response.json();
                        login({ username: data.email, userId: data.id });
                    } else {
                        console.error('Failed to fetch user info');
                    }
                } catch (error) {
                    console.error('Error fetching user info:', error);
                }
            }
        }

        checkLoggedIn();
    }
    , []);

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, userId, login, logout, deleteAccount}}>
            {children}
        </AuthContext.Provider>
    );
};
