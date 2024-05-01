import React from 'react';
import { useAuth } from './AuthContext.jsx';

function Logout() {
    const { logout } = useAuth(); // Utilizamos la función de logout del contexto

    const handleLogout = async () => {
        console.log('Logging out...');
        console.log('Cookies en loginout:', document.cookie);

        await logout(); // Esto actualizará el estado y limpiará la sesión
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
