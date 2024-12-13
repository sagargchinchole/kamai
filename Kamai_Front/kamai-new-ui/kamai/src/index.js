import React from 'react';
import * as ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom'
import App from './App';
import AdminProductList from './components/AdminProductList';
import Orders from './pages/Orders';
import Layout from './layout/Layout';
import ProductDetails from './components/ProductDetails';
import Payment from './pages/Payment';
import Users from './pages/Users';
import SignIn from './pages/SignIn';
import ProductList from './pages/ProductList';
import MyOrders from './pages/MyOrders';
import MyWallet from './pages/MyWallet';
import MyOrderDetails from './pages/MyOrderDetails';

const router = createBrowserRouter([
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
            path: "/payment",
            Component: Payment
          },
          {
            path: "/login",
            Component: SignIn
          },
          {
            path: "/users",
            Component: Users
          },
          {
            path: "/activeDeals",
            Component: ProductList
          },
          {
            path: "/activeDeals/:id",
            Component: ProductDetails
          },
          {
            path: "/myOrders",
            Component: MyOrders
          },
          {
            path: "/myOrders/:id",
            Component: MyOrderDetails
          },
          {
            path: "wallet",
            Component: MyWallet
          }
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
