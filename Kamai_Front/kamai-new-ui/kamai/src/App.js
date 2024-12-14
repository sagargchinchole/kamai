import * as React from 'react';
import { Outlet, useLocation, Navigate } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import { useNavigate } from 'react-router-dom';
import { SessionProvider, useSession } from './SessionContext';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

const NAVIGATION = {
  admin: [
    { segment: "deals", title: "Deals", icon: <DashboardIcon /> },
    { segment: "orders", title: "All Orders", icon: <ShoppingCartIcon /> },
    { segment: "users", title: "Users", icon: <PeopleIcon /> },
    { segment: "payment", title: "Payments", icon: <PaymentIcon /> },
  ],
  user: [
    { segment: "activeDeals", title: "Active Deals", icon: <DashboardIcon /> },
    { segment: "myOrders", title: "My Orders", icon: <ShoppingCartIcon /> },
    { segment: "wallet", title: "My Wallet", icon: <AccountBalanceWalletIcon /> },
  ],
};

function App() {
  const { session, setSession } = useSession(); // Use session context
  const navigate = useNavigate();
  const location = useLocation();

  const signIn = React.useCallback(() => {
    navigate('/login');
  }, [navigate]);

  const signOut = React.useCallback(() => {
    setSession(null);
    localStorage.removeItem('session'); // Clear session from localStorage
    navigate('/login');
  }, [navigate, setSession]);

  // Load session from localStorage on app initialization
  React.useEffect(() => {
    const storedSession = localStorage.getItem('session');
    if (storedSession) {
      setSession(JSON.parse(storedSession));
    }
  }, [setSession]);

  // Persist session to localStorage whenever it changes
  React.useEffect(() => {
    if (session) {
      localStorage.setItem('session', JSON.stringify(session));
    }
  }, [session]);

  // Define public routes
  const publicRoutes = ["/login"];
  const isPublicRoute = publicRoutes.includes(location.pathname);
  const currentNavigation = session?.user?.role ? NAVIGATION[session.user.role] : [];

  return (
    <AppProvider
      session={session}
      authentication={{ signIn, signOut }}
      navigation={currentNavigation}
      branding={{ logo: <img src="/assets/icon.png" alt="Logo" width={50} />, title: "" }}
    >
      {session || isPublicRoute ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </AppProvider>
  );
}

export default function RootApp() {
  return (
    <SessionProvider>
      <App />
    </SessionProvider>
  );
}