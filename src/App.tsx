import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Vehicles from './pages/Vehicles';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/users/Dashboard';
import Bookings from './pages/users/Bookings';
import Settings from './pages/users/Settings';
import Support from './pages/users/Support';
import Payments from './pages/users/Payments';
import PaymentRedirect from './pages/users/PaymentRedirect';
import AdminDashboard from './pages/admin/AdminDashboard';
import AllBookings from './pages/admin/AllBookings';
import AllPayments from './pages/admin/AllPayments';
import AllTickets from './pages/admin/AllTickets';
import Analytics from './pages/admin/Analytics';
import AllVehicles from './pages/admin/AllVehicles';

function App() {

  const router = createBrowserRouter([ 
    {
      path: '/',
      element: <Home />
    },
    {
      path: '/about',
      element: <About/>,
     
    },
    {
      path: '/contact',
      element: <Contact/>
    },
    {
      path: '/vehicles',
      element: <Vehicles/>
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/register',
      element: <Register />
    },
    {
      path:'/dashboard',
      element: <Dashboard/>
    },
    {
      path:'/dashboard/bookings',
      element: <Bookings/>
    },
    {
      path:'/dashboard/settings',
      element: <Settings />
    },
    {
      path: '/dashboard/support',
      element:  <Support />
    },
    {
      path:'/dashboard/payments',
      element: <Payments />
    },
    {
      path:"/payment/callback",
      element: <PaymentRedirect/>
    },
    {
      path: "/admin-dashboard",
      element: <AdminDashboard/>
    },
    {
      path: "/admin-dashboard/bookings",
      element: <AllBookings/>
    },
    {
      path: "/admin-dashboard/payments",
      element: <AllPayments/>
    },
    {
      path: "/admin-dashboard/tickets",
      element: <AllTickets/>
    },
    {
      path: "/admin-dashboard/settings",
      element: <Settings/>
    },
    {
      path: "/admin-dashboard/analytics",
      element: <Analytics/>
    },
    {
      path: '/admin-dashboard/vehicles',
      element: <AllVehicles/>
    }

  ])
 

  return (
       <RouterProvider router={router} />
  )
}

export default App
