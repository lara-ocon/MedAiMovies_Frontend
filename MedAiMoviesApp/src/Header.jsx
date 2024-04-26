import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import UserInfo from './UserInfo.jsx';
import Logout from './Logout.jsx'; // Importa el componente Logout

export default function Header() {
    const { isLoggedIn } = useAuth();

    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>MedAiMovies</h1>
            </Link>
            
            <div>{/* Aquí irá la barra de búsqueda en el futuro */}</div>
            
            <div>
                {isLoggedIn ? (
                    <>
                        <UserInfo /> {/* Muestra el nombre de usuario */}
                        <Logout /> {/* Componente de Logout */}
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <span> / </span>
                        <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>
        </header>
    );
}
