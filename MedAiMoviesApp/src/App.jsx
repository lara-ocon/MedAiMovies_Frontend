import React, { useState } from 'react';
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import { Outlet } from "react-router-dom";
import UserInfo from './UserInfo.jsx'; // Importa el componente UserInfo
import Logout from './Logout.jsx'; // Importa el componente Logout

export default function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para el estado de autenticación

    const handleLogout = () => {
        // Lógica para cerrar sesión
        setIsLoggedIn(false);
    };

    return (
        <>
            <Header isLoggedIn={isLoggedIn} /> {/* Pasa el estado de autenticación al componente Header */}
            <Outlet/>
            <Footer/>
        </>
    );
}
