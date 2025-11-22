import React from 'react'
import { Link,useNavigate } from 'react-router'
import type { RootState } from '../store/store';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../features/slice/AuthSlice';
import { ChevronDown, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { isAuthenticated, user } = useSelector((state: RootState) => state.authSlice);
  

    const handleLogout = () => {
        dispatch(clearCredentials());
        navigate("/login");
    };

    return (
        <div className="navbar bg-white shadow-md sticky top-0 z-50 py-4">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
                        tabIndex={-1}
                        className="menu menu-sm dropdown-content bg-white rounded-lg z-10 mt-3 w-52 p-2 shadow-lg border">
                        <Link to="/"><li><a className="text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Home</a></li></Link>
                        <Link to="/meals"><li><a className="text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Kenyan Dishes</a></li></Link>
                        <Link to="/about"><li><a className="text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors duration-200">About</a></li></Link>
                        <Link to="/contact"><li><a className="text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Contact</a></li></Link>
                        <Link to="register"><li><a className="text-gray-700 hover:text-amber-600 hover:bg-gray-50 rounded-md transition-colors duration-200">Register</a></li></Link>
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-semibold text-amber-600 hover:bg-transparent">🍛 Taste of Kenya</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    <Link to="/"><li><a className="text-gray-600 hover:text-amber-600 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Home</a></li></Link>
                    <Link to="/meals"><li><a className="text-gray-600 hover:text-amber-600 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Kenyan Dishes</a></li></Link>
                    <Link to="/about"><li><a className="text-gray-600 hover:text-amber-600 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">About</a></li></Link>
                    <Link to="/contact"><li><a className="text-gray-600 hover:text-amber-600 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Contact</a></li></Link>
                    {!isAuthenticated?( <Link to="/register"><li><a className="text-gray-600 hover:text-amber-600 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Register</a></li></Link>)
                    :( <Link to="/dashboard"><li><a className="text-gray-600 hover:text-amber-600 hover:bg-gray-50 font-medium px-4 py-2 rounded-md transition-all duration-300">Dashboard</a></li></Link>)}
                   
                </ul>
            </div>
             <div className="navbar-end">
                {!isAuthenticated ? (
                    <Link to="/login">
                        <a className="btn bg-green-800 hover:bg-green-900 text-white border-green-800 hover:border-green-900 px-6 py-2 font-medium transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
                            Login
                        </a>
                    </Link>) : (
                    <div className="dropdown dropdown-end">
                        <button className="btn btn-ghost flex items-center">
                            <div className="flex items-center">
                                <span className="text-dark">Hey, {user?.last_name}</span>
                                <ChevronDown color="#318c18" />                                
                            </div>
                        </button>
                        <ul className="dropdown-content bg-neutral-200 rounded-box z-1 mt-3 w-52 p-2 shadow">

                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center text-green-700 hover:text-green-800 cursor-pointer"
                                >
                                    <LogOut color="#318c18" className='mr-3'/>
                                    Logout
                                </button>
                            </li>
                        </ul>
                    </div>
                )
                }


            </div>
        </div>
    )
}

export default Navbar


