import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import Logout from './Logout.jsx'; // Importa el componente Logout
import './templates/header.css'; // Importa los estilos definidos anteriormente

export default function Header() {
    const { isLoggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('titulo');
    const navigate = useNavigate();

    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchTerm)}&t=${encodeURIComponent(searchType)}`);
        setSearchTerm('');
    };

    const handleSelectChange = (e) => {
        setSearchType(e.target.value);
        // Aquí establece también el valor de searchTerm si deseas que cambie cuando cambie el selector
        setSearchTerm('');
    };

    // Controlar que la barra de búsqueda sea de tipo texto o número
    const inputType = searchType === 'nota' ? 'number' : 'text';
    const placeholder = searchType === 'nota' ? 'Introduzca nota (1-5)' : '🔎 Buscar películas...';
    const min = searchType === 'nota' ? 1 : undefined;
    const max = searchType === 'nota' ? 5 : undefined;

    return (
        <header className="header-container">
            <Link to="/">
                <h1>MedAiMovies</h1>
            </Link>

            <form onSubmit={handleSearch}>
                <select id="desplegable" value={searchType} onChange={handleSelectChange}>
                    <option value="titulo">Título</option>
                    <option value="director">Director</option>
                    <option value="genero">Género</option>
                    <option value="sinopsis">Sinopsis</option>
                    <option value="nota">Nota</option>
                </select>
                <input
                    id="search-input"
                    type={inputType}
                    placeholder={placeholder}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    min={min}
                    max={max}
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
