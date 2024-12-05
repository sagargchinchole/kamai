import React from 'react';
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider,Navigate  } from 'react-router-dom'
import App from './App';
import AdminCard from './components/AdminCard';
import Orders from './pages/Orders';
import Layout from './layout/Layout';
import ProductDetails from './components/ProductDetails';
import Payment from './pages/Payment';
import Users from './pages/Users';
import SignIn from './pages/SignIn';

const router = createBrowserRouter([
  {
    Component: App,
    children: [
      {
        path: "/",
        Component: Layout,
        children: [
          {
            index: true, // Marks this as the default child route
            Component: () => <Navigate to="/deals" replace />, // Redirect to /deals
          },
          {
            path: "/deals",
            Component: AdminCard
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
          {
            path: "/login",
            Component: SignIn
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
