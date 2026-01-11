import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import { router } from './routers/Router.jsx';
import { RouterProvider } from 'react-router';
import AuthProvider from './contexts/AuthProvider.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Toaster } from 'react-hot-toast';

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
        <Toaster
          position="top-center"
          reverseOrder={false}
        />
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);
