import React, { useState } from 'react';
import { useNavigate, useActionData, Form } from 'react-router-dom';

export default function Register() {
    const navigate = useNavigate();
    const actionData = useActionData();

    // si el registro es exitoso, navega al login
    if (actionData && !actionData.error) {
        navigate('/login');
    }

    // si hay error
    const error = actionData?.error;

    return (
        <div className="container">
            <h1>Register</h1>
            <div className="info">
                {error && <p className="error">{error}</p>}
                <Form method="post">
                    <div className="form-control">
                        <label htmlFor="nombre">Nombre</label>
                        <input type="text" name="nombre" placeholder="Nombre completo" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="tel">Teléfono</label>
                        <input type="text" name="tel" placeholder="Teléfono" />
                    </div>
                    <div className="form-control">
                        <label htmlFor="email">Email</label>
                        <input type="email" name="email" placeholder="Correo electrónico" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="password">Contraseña</label>
                        <input type="password" name="password" placeholder="Contraseña" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="confirmPassword">Confirma la contraseña</label>
                        <input type="password" name="confirmPassword" placeholder="Confirma la contraseña" required />
                    </div>
                    <div className="login-button">
                        <button type="submit">Register</button>
                    </div>
                </Form>
            </div>
        </div>
    );
}
