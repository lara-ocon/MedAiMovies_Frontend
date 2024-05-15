import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import MovieListPage from './MovieListPage.jsx'
import MovieDetailPage from './MovieDetailPage.jsx';
import SearchPage from './SearchPage.jsx';
import ErrorComponent from './ErrorComponent.jsx';
import Login from './Login.jsx'
import Register from './Register.jsx'
import UserInfo from './UserInfo.jsx';
import { AuthProvider } from './AuthContext.jsx';
import './templates/index.css';

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    {
      path: "",
      element: <MovieListPage />,
      loader: async () => {
        const response = await fetch('https://medaimovies-backend.onrender.com/api/peliculas/');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de películas');
        }
        return await response.json();
      },
      errorElement: <ErrorComponent />
    },
    {
      path: "movie/:movieId",
      element: <MovieDetailPage />,
      loader: async ({ params }) => {
        const response = await fetch(`https://medaimovies-backend.onrender.com/api/peliculas/${params.movieId}/`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la película');
        }
        return await response.json();
      },
      errorElement: <ErrorComponent />,
    },
    {
      path: "search",
      element: <SearchPage />,
      loader: async ({ request }) => {
        const urlParams = new URLSearchParams(request.url.split('?')[1]);
        const query = urlParams.get('q');
        const type = urlParams.get('t') || 'title';
        const response = await fetch(`https://medaimovies-backend.onrender.com/api/peliculas/search/?${encodeURIComponent(type)}=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Error en la búsqueda de películas');
        return await response.json();
      },
      errorElement: <ErrorComponent />
    },
    {
      path: "login",
      element: <Login />,
      action: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const response = await fetch('https://medaimovies-backend.onrender.com/api/users/login/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          const error = await response.text();
          return { error };
        }
        return await response.json();
      }
    },
    {
      path: "register",
      element: <Register />,
      action: async ({ request }) => {
        const formData = await request.formData();
        const nombre = formData.get('nombre');
        const tel = formData.get('tel');
        const email = formData.get('email');
        const password = formData.get('password');
        const confirmPassword = formData.get('confirmPassword');

        if (password !== confirmPassword) {
          return { error: "Las contraseñas no coinciden." };
        }

        const response = await fetch('https://medaimovies-backend.onrender.com/api/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, tel, email, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          if (errorData.email) return { error: errorData.email[0] };
          if (errorData.tel) return { error: errorData.tel[0] };
          if (errorData.password) return { error: errorData.password[0] };
          return { error: 'Por favor, verifica los datos introducidos.' };
        }

        return await response.json();
      }
    },
    {
      path: "userInfo",
      element: <UserInfo />,
      loader: async () => {
        const response = await fetch('https://medaimovies-backend.onrender.com/api/users/me/', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user info');
        }

        return await response.json();
      },
      action: async ({ request }) => {
        const formData = await request.formData();
        const nombre = formData.get('nombre');
        const tel = formData.get('tel');
        const email = formData.get('email');
        const password = undefined;
        const id = formData.get('id');

        const response = await fetch('https://medaimovies-backend.onrender.com/api/users/me/', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            id,
            nombre: nombre,
            tel,
            email,
            password
          })
        });

        if (!response.ok) {
          throw new Error('Failed to update user info');
        }
        return await response.json();
      }
    }
  ],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

