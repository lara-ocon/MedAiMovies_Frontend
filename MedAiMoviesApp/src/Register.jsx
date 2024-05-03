import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
    const [nombre, setNombre] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Las contraseñas no coinciden.");
            return;
        }

        const response = await fetch('http://127.0.0.1:8000/api/users/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({nombre, tel, email, password})
        });

        if (response.ok) {
            navigate('/login'); // Navega al login tras el registro exitoso
        } else {
            // Manejo de errores del servidor
            const errorData = await response.json();
            alert(`Error en el registro: ${errorData.detail || 'Por favor, verifica los datos introducidos.'}`);
        }
    };

    return (<div className="container">
        <h1>Register</h1>
        <div className="info">
            <form onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">Nombre</label>
                    <input type="text" id="name" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" required />
                </div>
                <div className="form-control">
                    <label htmlFor="tel">Teléfono</label>
                    <input type="text" id="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="Teléfono" />
                </div>
                <div className="form-control">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" required />
                </div>
                <div className="form-control">
                    <label htmlFor="password">Contraseña</label>
                    <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
                </div>
                <div className="form-control">
                    <label htmlFor="confirmPassword">Confirma la contraseña</label>
                    <input type="password" id="confirmPassword" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirma la contraseña" required />
                </div>
                <div className="login-button">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
        </div>
    );
}
