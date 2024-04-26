import React, { useState, useEffect } from 'react';

function UserInfo() {
    const [username, setUsername] = useState(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const response = await fetch('http://127.0.0.1:8000/api/users/me/', {
                    method: 'GET',
                    credentials: 'include', // Incluye las cookies en la solicitud
                });
                if (response.ok) {
                    const data = await response.json();
                    setUsername(data.username);
                } else {
                    setUsername(null);
                }
            } catch (error) {
                console.error('Error fetching user info:', error);
            }
        };

        fetchUserInfo();
    }, []);

    return <span>{username}</span>;
}

export default UserInfo;
