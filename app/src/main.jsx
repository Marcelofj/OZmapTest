// React
import React from 'react'
import ReactDOM from 'react-dom/client'
// App
import AppRoutes from './AppRoutes.jsx'
// React Router
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

const router = createBrowserRouter(AppRoutes)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
