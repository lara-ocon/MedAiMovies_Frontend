import React from 'react';
import { useLoaderData, useActionData, Form, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext.jsx';

export default function UserInfo() {
    const navigate = useNavigate();
    const userInfo = useLoaderData(); // Obtiene los datos del loader
    const actionData = useActionData(); // Obtiene los datos de la acción del router
    const { deleteAccount } = useAuth();

    // Actualizar el estado local con los datos del loader
    const [username, setUsername] = React.useState(userInfo.nombre);
    const [tel, setTel] = React.useState(userInfo.tel);
    const [email, setEmail] = React.useState(userInfo.email);
    const [password, setPassword] = React.useState(userInfo.password);
    const [id, setId] = React.useState(userInfo.id);

    // Si hay respuesta de la acción, maneja la actualización
    React.useEffect(() => {
        if (actionData) {
            if (actionData.error) {
                alert(actionData.error);
            }
        }
    }, [actionData]);

    const handleDelete = async (event) => {
        event.preventDefault(); // Prevent the form from submitting normally
        await deleteAccount();
        navigate('/');
    }

    return (
        <div className="container">
            <h1>Actualizar Datos</h1>
            <div className="info">
                <Form method="post">
                    <input type="hidden" name="id" value={id} />
                    <input type="hidden" name="email" value={email} />
                    <input type="hidden" name="password" value={password} />
                    <div className="form-control">
                        <label htmlFor="name">Nombre</label>
                        <input type="text" id="name" name="nombre" value={username} onChange={e => setUsername(e.target.value)} placeholder="Nombre completo" required />
                    </div>
                    <div className="form-control">
                        <label htmlFor="tel">Teléfono</label>
                        <input type="text" id="tel" name="tel" value={tel} onChange={e => setTel(e.target.value)} placeholder="Teléfono" />
                    </div>
                    <div className="login-button">
                        <button type="submit">Actualizar</button>
                    </div>
                </Form>

                {/* Delete user button */}
                <form onSubmit={handleDelete}>
                    <div className="login-button">
                        <button type="submit">Eliminar cuenta</button>
                    </div>
                </form>
            </div>
        </div>
    );
}
