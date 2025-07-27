import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="flex items-center justify-between px-6 py-4 shadow-md bg-white">
    <h1 className="text-2xl font-bold text-blue-600">VideoGrab</h1>
    <ul className="flex gap-6 text-sm font-medium">
      <li>
        <Link to="/" className="hover:text-blue-600">
          Home
        </Link>
      </li>
      <li>
        <Link to="/pro" className="hover:text-blue-600">
          Pro
        </Link>
      </li>
      <li>
        <Link to="/login" className="hover:text-blue-600">
          Login
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navbar;
