import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import UserInfo from './UserInfo.jsx';
import Logout from './Logout.jsx';

export default function Header() {
    const { isLoggedIn, logout } = useAuth();

    return (
        <header>
            <h1>MedAiMovies</h1>
            <nav>
                <ul>
                    <li><Link to="/">Listado</Link></li>
                </ul>
            </nav>
            <div className="auth-links">
                {isLoggedIn ? (
                    <>
                        <UserInfo /> {/* Muestra UserInfo que maneja su propio estado */}
                        <Logout /> {/* Componente Logout para manejar la salida */}
                    </>
                ) : (
                    <ul>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Registrarse</Link></li>
                    </ul>
                )}
            </div>
        </header>
    );
}
