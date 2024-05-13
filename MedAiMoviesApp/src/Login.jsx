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
        // guarda el token en local storage

        if (response.ok) {
            const data = await response.json();
            localStorage.setItem('token', data.token);
            console.log('data y Token:', data);
            //login(email); // Aquí asumimos que el email identifica al usuario en el contexto
            login({ username: email, userId: data.userId })
            navigate('/'); // Navega a la página principal
        } else {
            // Manejo de error
            console.error('Failed to log in');
        }
    };

    return (<div className="container">
        <h1>Login</h1>
        <div className="info">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                </div>
                <div className="login-button">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
        </div>
    );
}
