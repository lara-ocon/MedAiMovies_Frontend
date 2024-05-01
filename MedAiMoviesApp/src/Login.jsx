import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAuth } from './AuthContext.jsx';

export default function Login() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include', // Importante para las cookies de sesión
            body: JSON.stringify({email, password})
        });
        console.log('Cookies en login:', document.cookie);

        if (response.ok) {
            login(email); // Aquí asumimos que el email identifica al usuario en el contexto
            navigate('/'); // Navega a la página principal
        } else {
            // Manejo de error
            console.error('Failed to log in');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
            <button type="submit">Login</button>
        </form>
    );
}
