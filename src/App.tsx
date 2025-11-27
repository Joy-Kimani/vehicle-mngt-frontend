import './App.css'
import {createBrowserRouter,RouterProvider,} from "react-router";
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Vehicles from './pages/Vehicles';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/users/Dashboard';
import Profile from './pages/users/Profile';
import Bookings from './pages/users/Bookings';
import Settings from './pages/users/Settings';

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
      path:'/dashboard/profile',
      element: <Profile/>
    },
    {
      path:'/dashboard/bookings',
      element: <Bookings/>
    },
    {
      path:'/dashboard/settings',
      element: <Settings />
    },
    

  ])
 

  return (
       <RouterProvider router={router} />
  )
}

export default App
