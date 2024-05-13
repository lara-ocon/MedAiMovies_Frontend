import React, { useState, useEffect } from 'react';

export default function UserInfo() {
    const [username, setUsername] = useState(null);
    const [tel, setTel] = useState(null);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [id, setId] = useState(null);

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
                    console.log('id',data.id);
                    setId(data.id);
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log('username',username);
        console.log('tel',tel);
        console.log('email',email);
        console.log('pass', password);
        const response = await fetch('http://127.0.0.1:8000/api/users/me/', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include', 
            body: JSON.stringify({
                id,
                nombre: username,
                tel,
                email,
                password
            })
        });

        if (response.ok) {
            console.log('User info updated successfully');
        } else {
            console.error('Failed to update user info');
        }
    }

    return (<div className="container">
    <h1>Atualizar Datos</h1>
    <div className="info">
        <form onSubmit={handleSubmit}>
            <div className="form-control">
                <label htmlFor="name">Nombre</label>
                <input type="text" id="name" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nombre completo" required />
            </div>
            <div className="form-control">
                <label htmlFor="tel">Teléfono</label>
                <input type="text" id="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="Teléfono" />
            </div>
            <div className="login-button">
                <button type="submit">Actualizar</button>
            </div>
        </form>
    </div>
    </div>
);
}
