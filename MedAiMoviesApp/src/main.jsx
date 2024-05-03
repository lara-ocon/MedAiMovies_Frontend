import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from './App.jsx'
import MovieListPage from './MovieListPage.jsx'
import MovieDetailPage from './MovieDetailPage.jsx';
import SearchPage from './SearchPage.jsx'; // Para la búsqueda de pelis
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
      element: <MovieListPage/>, // Antes era <ListPage/>
    },
    {
      path: "movie/:movieId",
      element: <MovieDetailPage/>,
    },
    {
      path: "search",
      element: <SearchPage/>,  // Añade esta línea para la página de búsqueda
    },
    {
      path: "login",
      element: <Login/>,
    },
    {
      path: "register",
      element: <Register/>,
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

