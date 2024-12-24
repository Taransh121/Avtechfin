import React from 'react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
    // Check if the token exists in localStorage
    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        if (location.pathname === '/dash') {
            navigate('/'); // Redirect to the home page
        }
        // Optionally, trigger a re-render
        window.location.reload();
    };

    return (
        <nav className="bg-gray-900 shadow-lg">
            <div className="max-w-7xl mx-auto px-4 flex justify-between h-16 items-center">
                {/* Logo */}
                <div>
                    <Link to="/" className="text-white text-2xl font-bold">
                        AvtechFin
                    </Link>
                </div>

                {/* Conditional Rendering */}
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        to="/login"
                        className="bg-blue-600 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                    >
                        Login
                    </Link>
                )}
            </div>
        </nav>
    );
};
