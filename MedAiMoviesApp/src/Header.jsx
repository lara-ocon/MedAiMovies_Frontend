import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';
import UserInfo from './UserInfo.jsx';
import Logout from './Logout.jsx'; // Importa el componente Logout

export default function Header() {
    const { isLoggedIn } = useAuth();
    const [searchTerm, setSearchTerm] = useState(''); // Estado para la barra de búsqueda
    const navigate = useNavigate(); // Hook de navegación

    // Función para manejar la búsqueda
    const handleSearch = (event) => {
        event.preventDefault();
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
    };


    return (
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px' }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                <h1>MedAiMovies</h1>
            </Link>
            
            {/* Barra de búsqueda */}
            <form onSubmit={handleSearch} style={{ display: 'flex' }}>
                <input
                    type="text"
                    placeholder="Buscar películas..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: '10px' }}
                />
                <button type="submit">Buscar</button>
            </form>

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
