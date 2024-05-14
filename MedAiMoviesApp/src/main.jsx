import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import MovieListPage from './MovieListPage.jsx'
import MovieDetailPage from './MovieDetailPage.jsx';
import SearchPage from './SearchPage.jsx'; // Para la búsqueda de pelis
import ErrorComponent from './ErrorComponent.jsx'; 
import Login from './Login.jsx'
import Register from './Register.jsx'
import UserInfo from './UserInfo.jsx';
import { AuthProvider } from './AuthContext.jsx';
import './templates/index.css';

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [
    {
      path: "",
      element: <MovieListPage/>,
      loader: async () => {
        const response = await fetch('http://127.0.0.1:8000/api/peliculas/');
        if (!response.ok) {
          throw new Error('No se pudo obtener la lista de películas');
        }
        else {
          console.log('Erroorrrr');
        }
        return await response.json();
      },
      errorElement: <ErrorComponent/>
    },
    {
      path: "movie/:movieId",
      element: <MovieDetailPage/>,
      loader: async ({ params }) => {
        const response = await fetch(`http://127.0.0.1:8000/api/peliculas/${params.movieId}/`);
        if (!response.ok) {
          throw new Error('No se pudo obtener la película');
        }
        return await response.json();
      },
      errorElement: <ErrorComponent/>,
    },
    {
      path: "search",
      element: <SearchPage/>,
      loader: async ({ request }) => {
        const urlParams = new URLSearchParams(request.url.split('?')[1]);
        const query = urlParams.get('q');
        const type = urlParams.get('t') || 'title'; // Default to 'title' if type not provided
        const response = await fetch(`http://127.0.0.1:8000/api/peliculas/search/?${encodeURIComponent(type)}=${encodeURIComponent(query)}`);
        if (!response.ok) throw new Error('Error en la búsqueda de películas');
        return await response.json();
      },
      errorElement: <ErrorComponent/>
    },
    {
      path: "login",
      element: <Login/>,
      action: async ({ request }) => {
        const formData = await request.formData();
        const email = formData.get('email');
        const password = formData.get('password');
        const response = await fetch('http://127.0.0.1:8000/api/users/login/', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          credentials: 'include',
          body: JSON.stringify({email, password})
        });

        if (!response.ok) {
          const error = await response.text();
          throw new Error(error);
        }
        return await response.json();
      }
    },
    {
      path: "register",
      element: <Register/>,
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

        const response = await fetch('http://127.0.0.1:8000/api/users/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, tel, email, password })
        });

        if (!response.ok) {
          const errorData = await response.json();
          return { error: errorData.detail || 'Por favor, verifica los datos introducidos.' };
        }

        return await response.json();
      }
    },
    {
      path: "userInfo",
      element: <UserInfo/>,
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

