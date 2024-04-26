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

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={nombre} onChange={e => setNombre(e.target.value)} placeholder="Nombre completo" required />
            <input type="text" value={tel} onChange={e => setTel(e.target.value)} placeholder="Teléfono" />
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" required />
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Contraseña" required />
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirma la contraseña" required />
            <button type="submit">Registrarse</button>
        </form>
    );
}
