import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import ReactDOM from 'react-dom/client'
import { Provider as ReduxProvider } from 'react-redux'

import 'normalize.css'
import { store } from './app/store.ts'
import { Container } from '@mui/material'
import Main from './pages/Main.tsx'
import { Person } from './pages/Person.tsx'

const router = createBrowserRouter([
  {
    children: [
      {
        path: '/',
        element: <Main />,
      },
      {
        path: 'person/:id',
        element: <Person />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <Container sx={{ paddingTop: 10, paddingBottom: 10, minHeight: '1vh' }}>
        <RouterProvider router={router} />
      </Container>
    </ReduxProvider>
  </React.StrictMode>
)
