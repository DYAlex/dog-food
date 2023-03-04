import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './App'
import Main from './components/pages/Main/Main'
import ProductPage from './components/pages/ProductPage/ProductPage'
import ProductDetail from './components/pages/ProductDetail/ProductDetail'
import { SignUp } from './components/pages/SignUp/SignUp'
import { SignIn } from './components/pages/SignIn/SignIn'
import Profile from './components/pages/Profile/Profile'
// import { QueryContextProvider } from './contexts/QueryContextProvider'
// import { Loader } from './components/CommonUI/Loader/Loader'
import ErrorPage from './components/pages/Error/ErrorPage'
import CartPage from './components/pages/Cart/Cart'
import FavoritesPage from './components/pages/Favorites/Favorites'
import { AddProduct } from './components/pages/AddProduct/AddProduct'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // default: true
    },
  },
})

const Router = createBrowserRouter(
  [
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
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
          path: 'products/add',
          element: <AddProduct />,
        },
        {
          path: 'cart',
          element: <CartPage />,
        },
        {
          path: 'favorites',
          element: <FavoritesPage />,
        },
        // {
        //   path: 'loader',
        //   element: <Loader />,
        // },
      ],
    },
  ],
  { basename: '/dog-food' },
)

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={Router} />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
)
