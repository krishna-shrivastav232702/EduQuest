import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './contexts/AuthProvider.tsx'
import Router from './Routers/Router.tsx'
import { RouterProvider } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={Router}/>
    </AuthProvider>
  </StrictMode>,
)
