import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import ListPage from './ListPage.jsx'
import MovieListPage from './MovieListPage.jsx'
import ContactInfo from './ContactInfo.jsx'
import Login from './Login.jsx'
import Register from './Register.jsx'
import { AuthProvider } from './AuthContext.jsx';
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
  children: [{
    path: "",
    element: <MovieListPage/>, // Antes era <ListPage/>
  },{
    path: "contactInfo",
    element: <ContactInfo/>,
  },
  {
    path: "login",
    element: <Login/>,
  },
  {
    path: "register",
    element: <Register/>,
  }],
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>,
);

