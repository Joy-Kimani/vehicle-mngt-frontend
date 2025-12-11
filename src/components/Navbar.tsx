import React from "react";
import { Link, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store/store";
import { logout } from "../features/Slice/AuthSlice";


const AvatarPlaceholder = () => (
  <div className="bg-neutral text-neutral-content rounded-full w-10 h-10 flex items-center justify-center">
    <span className="text-xl">U</span>
  </div>
);

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.authSlice
  );

  const isAdmin = user?.role === "admin";

  const handleLogout = () => {

  dispatch(logout());
    
  navigate("/login", { replace: true });
  };

  return (
    <div className="navbar sticky top-0 z-50 shadow-lg bg-amber-500 text-zinc-700 font-serif text-lg">
      {/* LEFT */}
      <div className="navbar-start">
        {/* Mobile menu */}
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-ghost lg:hidden">
            ☰
          </label>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-amber-500 rounded-box w-52 text-white"
          >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/vehicles">Cars</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>

            {isAuthenticated && !isAdmin && (
              <li><Link to="/dashboard">My Dashboard</Link></li>
            )}

            {isAuthenticated && isAdmin && (
              <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
            )}

            {!isAuthenticated && (
              <>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/login">Login</Link></li>
              </>
            )}
          </ul>
        </div>

        <Link to="/" className="btn btn-ghost text-xl">
          McCormick
        </Link>
      </div>

      {/* Desktop */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/vehicles">Cars</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>

          {isAuthenticated && !isAdmin && (
            <li><Link to="/dashboard">My Dashboard</Link></li>
          )}

          {isAuthenticated && isAdmin && (
            <li><Link to="/admin-dashboard">Admin Dashboard</Link></li>
          )}

          {!isAuthenticated && (
            <>
              <li><Link to="/register">Register</Link></li>
              <li><Link to="/login">Login</Link></li>
            </>
          )}
        </ul>
      </div>

      {/* RIGHT */}
      <div className="navbar-end">
        {isAuthenticated && (
          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <AvatarPlaceholder />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-zinc-700 text-amber-300 rounded-box w-52"
            >
              <li><Link to="dashboard/settings">Profile</Link></li>
              <li><Link to="dashboard/settings">Settings</Link></li>
              <li>
                <button onClick={handleLogout}className="text-red-400">
                    Logout
                  
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
