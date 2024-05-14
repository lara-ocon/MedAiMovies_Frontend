import React, { useEffect, useState } from 'react';
import { useNavigate, useActionData, Form } from "react-router-dom";
import { useAuth } from './AuthContext.jsx';

export default function Login() {
    const { login } = useAuth();
    const navigate = useNavigate();
    const actionData = useActionData(); // Obtiene los datos de la acción del loader(router)

    // Si el login es exitoso, pasamos la respuesta a la función login del contexto
    useEffect(() => {
        if (actionData && actionData.email && actionData.userId) {
            console.log('Login exitoso');
            login({ username: actionData.email, userId: actionData.userId });
            localStorage.setItem('token', actionData.token);
            navigate('/'); // Navega a la página principal
        } else {
            console.log('Login fallido');
        }
    },
        [actionData, login, navigate]);

    // si hay error
    const error = actionData?.error;

    return (
        <div className="container">
            <h1>Login</h1>
            <Form method="post">
                <div className="info">
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" required />
                    </div>
                    {error && <p className="error">⚠️{error.substring(11, 34)}</p>}
                    <div className="login-button">
                        <button type="submit">Login</button>
                    </div>
                </div>
            </Form>
        </div>
    );
}
