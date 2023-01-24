import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import Main from './components/Main/Main'
import ProductPage from './components/ProductPage/ProductPage'
import ProductDetail from './components/ProductDetail/ProductDetail'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import Profile from './components/Profile/Profile'
import { QueryContextProvider } from './contexts/QueryContextProvider'
import { Loader } from './components/Loader/Loader'

const queryClient = new QueryClient()

const Router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'signup',
        element: <SignUp />,
      },
      {
        path: 'signin',
        element: <SignIn />,
      },
      {
        path: 'profile',
        element: <Profile />,
      },
      {
        path: 'products/',
        element: <ProductPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetail />,
      },
      {
        path: 'loader',
        element: <Loader />,
      },
    ],
  },
],
{ basename: '/dog-food' },
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
      </QueryClientProvider>
    </QueryContextProvider>
  </React.StrictMode>,
)
