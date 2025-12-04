import React from 'react'
import { Link } from 'react-router'

const AvatarPlaceholder = () => (
    <div className="bg-neutral text-neutral-content rounded-full w-10 flex items-center justify-center">
        <span className="text-xl">U</span>
    </div>
);

const Navbar:React.FC = () => {

//   const navigate = useNavigate();

  return (
<>
{/* <div className=' bg-amber-900 font-serif'> */}
        <div className="navbar shadow-lg text-zinc-600 bg-amber-500 font-serif text-lg position-sticky">
            {/*logo/home link*/}
            <div className="navbar-start">
                <Link to="/" className="btn btn-ghost text-xl">
                    McCormick
                </Link>
            </div>

            {/* Main Navigation Links */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {/* navigation links */}
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/vehicles">Cars</Link></li>
                    <li><Link to="/about">About Us</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    <li><Link to="/dashboard">My Dashboard</Link></li>
                    <li><Link to="/register">Register</Link></li>
                    <li><Link to="/login">Login</Link></li>
                    <li><Link to = "/admin-dashboard">Admin Dashboard</Link></li>
                    {/* dropdown menu */}
                    <li className="dropdown dropdown-hover">
                        
                    </li>
                </ul>
            </div>

            {/*actions */}
            <div className="navbar-end">
                {/*User Profile Dropdown */}
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {/* placeholder for the user avatar image */}
                            <AvatarPlaceholder />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content text-amber-300 bg-zinc-600 rounded-box z-[1] mt-3 w-52 p-2 shadow-xl"> {/* Added z-[1] and shadow-xl */}
                        <li>
                            <Link to="/profile" className="justify-between">
                                Profile
                                <span className="badge badge-secondary">New</span>
                            </Link>
                        </li>
                        <li><Link to="/settings">Settings</Link></li>
                        <li><Link to = "/login">Log Out</Link></li>
                    </ul>
                </div>
            </div>
        </div>
        {/* </div> */}
        </> 
    );
}
export default Navbar
