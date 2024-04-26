import React from 'react';

function Logout() {
    const handleLogout = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/users/logout/', {
                method: 'DELETE',
                credentials: 'include', // Incluye las cookies en la solicitud
            });
            if (response.ok) {
                // Lógica para limpiar el estado de autenticación o redirigir a otra página
            } else {
                console.error('Error logging out');
            }
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };

    return <button onClick={handleLogout}>Logout</button>;
}

export default Logout;
