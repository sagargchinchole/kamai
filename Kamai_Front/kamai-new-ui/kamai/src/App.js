import * as React from 'react'
import { Outlet } from "react-router-dom";
import { AppProvider } from "@toolpad/core/AppProvider";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Person2Icon from '@mui/icons-material/Person2';
import PeopleIcon from '@mui/icons-material/People';
import PaymentIcon from '@mui/icons-material/Payment';
import { SignInPage } from '@toolpad/core';
function App() {
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
  const [session, setSession] = React.useState(null);

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {

      },
      signOut: () => {
        setSession(null);
      },
    };
  }, []);

  // preview-start
  const providers = [{ id: 'credentials', name: 'Email and Password' }];
  // preview-end

  const signIn = async (provider, formData) => {
    const promise = new Promise((resolve) => {
      setTimeout(() => {
        alert(
          `Signing in with "${provider.name}" and credentials: ${formData.get('email')}, ${formData.get('password')}`,
        );
        resolve();
      }, 300);
    });
    return promise;
  };

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      branding={{ logo: <img src="assets/icon.jpg" />, title: "Kamai" }}
    ><Outlet />
    </AppProvider>
  );
}

export default App;
