import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App'
import Main from './components/Main/Main'
import ProductPage from './components/ProductPage/ProductPage'
import ProductDetail from './components/ProductDetail/ProductDetail'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'

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
        path: 'products/',
        element: <ProductPage />,
      },
      {
        path: 'products/:productId',
        element: <ProductDetail />,
      },
    ],
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <RouterProvider router={Router} />
  </React.StrictMode>,
)
