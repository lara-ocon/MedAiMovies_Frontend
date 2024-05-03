import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import Logout from './Logout.jsx'; // Importa el componente Logout
import './templates/header.css'; // Importa los estilos definidos anteriormente

export default function Header() {
    const { isLoggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    };

    return (
        <header className="header-container">
            <Link to="/">
                <h1>MedAiMovies</h1>
            </Link>

            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="🔎 Buscar películas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Buscar</button>
            </form>

            <div className="auth-links">
                {isLoggedIn ? (
                    <>
                        <Link to="/userInfo">User Info</Link>
                        <Logout />
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/register">Registrarse</Link>
                    </>
                )}
            </div>
        </header>
    );
}
