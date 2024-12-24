import React from 'react'
import { Navbar } from '../components/Navbar'
import { useNavigate } from 'react-router-dom';

export const Dash = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/'); // Redirect to the home page
    };
    return (
        <>
            {/* <Navbar /> */}
            <div className="min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 flex">
                {/* Sidebar */}
                <aside className="w-64 bg-white shadow-md flex flex-col p-5">
                    <h2 className="text-2xl font-bold text-gray-800 mb-5">My Dashboard</h2>
                    <nav>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="/"
                                    className="block text-gray-700 font-medium hover:text-blue-500"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block text-gray-700 font-medium hover:text-blue-500"
                                >
                                    About
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="block text-gray-700 font-medium hover:text-blue-500"
                                >
                                    Settings
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    onClick={handleLogout} // Call logout when clicked
                                    className="block text-gray-700 font-medium hover:text-blue-500"
                                >
                                    Logout
                                </a>
                            </li>
                        </ul>
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="flex-1 flex flex-col justify-center items-center">
                    <div className="text-center text-white">
                        <h1 className="text-4xl font-bold mb-2">Welcome to Your Dashboard!</h1>
                        <p className="text-lg font-light mb-5">
                            Explore the features and manage your account effortlessly.
                        </p>
                        <button className="px-6 py-3 bg-white text-blue-500 font-medium rounded-lg shadow-md hover:bg-gray-200">
                            Sample Button
                        </button>
                    </div>
                </main>
            </div>
        </>

    );
}
