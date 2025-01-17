import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import loginImg from "../assets/login.png";
import { Navbar } from '../components/Navbar';

export const Register = () => {
    // State for input fields
    const [formData, setFormData] = useState("");

    const navigate = useNavigate();
    // Handlers for input changes
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value,
        });
    };


    // Submit handler
    const signupbtn = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://avtechfin.onrender.com/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            alert('Registration successful! Please verify your email to continue.');
            navigate('/login');
        } catch (error) {
            alert("Error occurred while creating your account, sorry! You may have to restart your server.");
        }
    };



    return (
        <>
            <Navbar />
            <div className="m-4 flex items-center justify-center">
                <div className="border border-green-100 flex flex-col md:flex-row w-full max-w-4xl bg-gray-800 rounded-lg shadow-lg overflow-hidden">

                    <div className="hidden md:flex w-1/2">
                        <img src={loginImg} alt="Office View" className="object-cover w-full h-full" />
                    </div>

                    <div className="flex flex-col justify-center w-full md:w-1/2 p-8">
                        <div className="text-left">
                            <h2 className="text-3xl font-semibold text-white mb-2">Sign up to begin journey</h2>
                            <p className="text-sm text-gray-400 mb-6"> It’s gonna be awesome! Let's get started!.</p>
                        </div>

                        <form onSubmit={signupbtn} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-400">Enter your name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                    placeholder="Enter your name"
                                    onChange={handleChange}
                                    required
                                    minLength={3}
                                    maxLength={20}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-400">Email Address</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                    placeholder="Enter your email"
                                    onChange={handleChange}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-gray-400">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="mt-2 w-full px-4 py-2 border border-gray-600 rounded-md bg-gray-900 text-gray-100 focus:border-green-500 focus:ring-green-500 focus:outline-none"
                                    placeholder="Enter password"
                                    onChange={handleChange}
                                    required
                                    minLength={5}
                                />
                            </div>

                            <div className="flex items-center justify-between">
                                <button
                                    type="submit"
                                    className="w-full bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none"
                                >
                                    Register
                                </button>
                            </div>

                            <div className="flex justify-end mt-2">
                                <Link to='/login' className='text-sm text-blue-500 hover:text-blue-600'>
                                    Already have an account? Login here
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};
