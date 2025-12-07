import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './routers/Router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './contexts/AuthProvider.jsx';

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
);
