import React from 'react';
import { useAuth } from './AuthContext.jsx';
import './templates/header.css'; // Importa los estilos definidos anteriormente

// Boton de logout en la barra de navegación
export default function Logout() {
    const { logout } = useAuth(); // Utilizamos la función de logout del contexto

    const handleLogout = async () => {
        console.log('Logging out...');
        console.log('Cookies en loginout:', document.cookie);
        
        // llamamos a logout de authcontext para hacer la llamada a logout
        await logout();
    };

    return <button id="logout-button" onClick={handleLogout}>Logout</button>;
}
