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
import AdminDashboard from './pages/admin/AdminDashboard';
import AllBookings from './pages/admin/AllBookings';
import AllPayments from './pages/admin/AllPayments';
import AllTickets from './pages/admin/AllTickets';
import Analytics from './pages/admin/Analytics';
import AllVehicles from './pages/admin/AllVehicles';
import PaymentHistory from './pages/users/PaymentHistory';
import PaymentCallback from './pages/users/PaymentCallback';
import SettingsPage from './pages/admin/SettingsPage';
import PublicRoute from './components/Auth/PublicRoute';
import UserRoute from './components/Auth/UserRoute';
import AdminRoute from './components/Auth/AdminRoute';
import UserManagement from './pages/admin/UserManagement';
import ResetPassword from './pages/ResetPassword';

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
      element: <PublicRoute><Login/></PublicRoute>
    },
    {
      path: '/reset-password',
      element: <PublicRoute><ResetPassword/></PublicRoute>
    },
    {
      path: '/register',
      element: <PublicRoute><Register /></PublicRoute>
    },
    {
      path:'/dashboard',
      element: <UserRoute><Dashboard/></UserRoute>
    },
    {
      path:'/dashboard/bookings',
      element: <UserRoute><Bookings/></UserRoute>
    },
    {
      path:'/dashboard/settings',
      element: <UserRoute><Settings /></UserRoute>
    },
    {
      path: '/dashboard/support',
      element:  <UserRoute><Support /></UserRoute>
    },
    {
      path:'/dashboard/payments/:bookingId',
      element: <UserRoute><Payments /></UserRoute>
    },
    {
      path: '/dashboard/payments',
      element: <UserRoute><PaymentHistory /></UserRoute>
    },
    {
      path: '/dashboard/payment/callback',
      element: <UserRoute><PaymentCallback /></UserRoute>
    },
    {
      path: "/admin-dashboard",
      element: <AdminRoute><AdminDashboard/></AdminRoute>
    },
    {
      path: "/admin-dashboard/bookings",
      element: <AdminRoute><AllBookings/></AdminRoute>
    },
    {
      path: "/admin-dashboard/payments",
      element: <AdminRoute><AllPayments/></AdminRoute>
    },
    {
      path: "/admin-dashboard/tickets",
      element: <AdminRoute><AllTickets/></AdminRoute>
    },
    {
      path: "/admin-dashboard/user-manage",
      element: <UserManagement/>
    },
    {
      path: "/admin-dashboard/analytics",
      element: <AdminRoute><Analytics/></AdminRoute>
    },
    {
      path: '/admin-dashboard/vehicles',
      element: <AdminRoute><AllVehicles/></AdminRoute>
    },
    {
      path:'/admin-dashboard/settings',
      element: <AdminRoute><SettingsPage /></AdminRoute>
    },

  ])
 

  return (
       <RouterProvider router={router} />
  )
}

export default App
