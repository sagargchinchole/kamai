import React from 'react';
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,Navigate  } from 'react-router-dom'
import App from './App';
import AdminProductList from './components/AdminProductList';
import Orders from './pages/Orders';
import Layout from './layout/Layout';
import ProductDetails from './components/ProductDetails';
import Payment from './pages/Payment';
import Users from './pages/Users';
import SignIn from './pages/SignIn';

const router = createBrowserRouter([
  {
    path: "/login",
    Component: (authentication ) => <SignIn authentication={authentication} />
  },
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            path: "/deals",
            Component: AdminProductList
          },
          {
            path: "/orders",
            Component: Orders
          },
          {
            path: "/deals/:id",
            Component: ProductDetails
          },
          {
            path: "/payment",
            Component: Payment
          },
          {
            path: "/users",
            Component: Users
          },
        ]
      }
    ]
  }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
