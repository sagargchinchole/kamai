import * as React from 'react'
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person2Icon from '@mui/icons-material/Person2';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import { SignInPage } from '@toolpad/core';
import axios from 'axios';

const NAVIGATION = [
  {
    kind: 'header',
    title: 'Main items',
  },
  {
    segment: 'deals',
    title: 'Active Deals',
    icon: <DashboardIcon />,
  },
  {
    segment: 'orders',
    title: 'Orders',
    icon: <ShoppingCartIcon />,
  },
  {
    segment: 'users',
    title: 'Users',
    icon: <PeopleIcon />,
  },
  {
    segment: 'payment',
    title: 'Payments',
    icon: <PaymentIcon />,
  }
]


function App() {
  
  const AUTHENTICATION = { signIn, signOut };
  const [session, setSession] = React.useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  // Public routes that don't require authentication
  const publicRoutes = ["/login"];

  async function signIn({ email, password }) {
    email = "sagar.chinchole@gmail.com";
    password="sagar"
    const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login`, { email, password});
      localStorage.setItem('token', response.data.token);
      setSession({user:{email:response.data.user.email,
        name:response.data.user.name
      }})
    console.log(email, password)
  }
  
  // Check if the current route is public
  const isPublicRoute = publicRoutes.includes(location.pathname);

  async function signOut() {
    setSession(null); // Clear the session state
  }

  // preview-start
  const providers = [{ id: 'credentials', name: 'Email and Password' }];
  // preview-end

  return (
    <AppProvider
      session={session}
      authentication={AUTHENTICATION}
      navigation={NAVIGATION}
      branding={{ logo: <img src="assets/icon.jpg" />, title: "Kamai" }}
    >
      <Outlet />
      {/* {session || isPublicRoute ? (
        <Outlet />
      ) : (
        // Redirect to login if not authenticated and not on a public route
        <Navigate to="/login" />
      )} */}
    </AppProvider>
  );
}
export default App;
