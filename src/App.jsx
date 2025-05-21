import './App.css'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route} from 'react-router-dom'
import PublicHome from './pages/PublicHome'
import Root from './pages/Root'
import Login from './pages/Login'
import Register from './pages/Register'
import ErrorPage from './pages/ErrorPage'
import PrivateHome from './pages/auth/PrivateHome'
import {ContextData, ContextProvider} from './store/data';
import Logout from './pages/auth/Logout'
import {  useEffect, useState } from 'react'


const routeDefinitions = createRoutesFromElements(
  <Route>
    <Route path='/' element />
  </Route>
)

const router = createBrowserRouter([
  { path: '/', 
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {path: '/',
        element: <PublicHome />
      },
      
      {path: '/login',
        element: <Login />
      },
      {path: '/register',
        element: <Register/>
      },
      {path: '/privato',
        element: <PrivateHome/>
      },
      {path: '/logout',
        element: <Logout/>
      }
      
    ]
  },
  
])
function App() {
  

  return <>
  <ContextProvider>
    <RouterProvider router={router} />
  </ContextProvider>
  </>
  
}

export default App
