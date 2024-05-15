import React from 'react';
import { useAuth } from './AuthContext.jsx';
import './templates/header.css';
import { useNavigate } from 'react-router-dom';

// Boton de logout en la barra de navegación
export default function Logout() {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Utilizamos la función de logout del contexto

    const handleLogout = async () => {
        // llamamos a logout de authcontext para hacer la llamada a logout
        await logout();
        navigate('/');
    };

    return <button id="logout-button" onClick={handleLogout}>Logout</button>;
}
