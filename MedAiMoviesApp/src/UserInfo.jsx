import React, { useState, useEffect } from 'react';

export default function UserInfo() {
    const [username, setUsername] = useState(null);
    const [tel, setTel] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/me/', {
                    method: 'GET',
                    credentials: 'include', // Incluye las cookies en la solicitud
                });
                console.log('Cookies en userinfo:', document.cookie);

                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.nombre);
                    setTel(data.tel);
                    setEmail(data.email);
                    setPassword(data.password);
                    console.log('idddd',data.id);
                } else {
                    setUsername(null);
                    setTel(null);
                    setEmail(null);
                    setPassword(null);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return (<div className="container">
    <h1>Atualizar Datos</h1>
    <div className="info">
        <form> {/* Aquí habría que poner un onSubmit={handleSubmit} y definirse esa función con lo que queremos que haga (actualizar los datos del usuario. De momento solo se muestran los datos actuales y si se pulsa "Actualizar" no pasa nada*/}
            <div className="form-control">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nombre completo" required />
            </div>
            <div className="form-control">
                <label htmlFor="tel">Teléfono</label>
                <input type="text" id="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="Teléfono" />
            </div>
            <div className="form-control">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Correo electrónico" required />
            </div>
            <div className="login-button">
                <button type="submit">Actualizar</button>
            </div>
        </form>
    </div>
    </div>
);
}
