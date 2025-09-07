import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

// { searchQuery, setSearchQuery }

const Header = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
        window.location.reload(); 
    };

    const getInitials = (user) => {
        if (!user) return '';
        const firstInitial = user.firstname ? user.firstname.charAt(0).toUpperCase() : '';
        const lastInitial = user.lastname ? user.lastname.charAt(0).toUpperCase() : '';
        return `${firstInitial}${lastInitial}`;
    };

    return (
        <header className="dark:bg-gray-900 text-white p-4 shadow-md hover:shadow-gray-950 transition-shadow duration-300">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold hover:text-gray-300">
                    <span className='text-amber-700 text-3xl'>Chro</span><span className='text-3xl'>Log</span>
                </Link> 

                {/* <input
                    className='py-2 px-3 rounded-lg w-125 dark:bg-gray-800'
                    type="text"
                    placeholder='Search here.....'
                    value={searchQuery} // Binds the input value to the state
                    onChange={(e) => setSearchQuery(e.target.value)} // Updates the state on change
                /> */}

                <nav className="flex space-x-4 items-center">
                    <Link to="/" className="text-black bg-amber-100 px-3 py-2 rounded-lg font-bold ">
                        Home
                    </Link>

                     <Link to="/contact" className="text-black bg-amber-100 px-3 py-2 rounded-lg font-bold ">
                        Contact Us
                    </Link>


                    <Link to="/about-us" className="text-black bg-amber-100 px-3 py-2 rounded-lg font-bold">
                        About Us
                    </Link>

                    {/* <Link to="/donate" className="text-black bg-amber-100 px-3 py-2 rounded-lg font-bold">
                        Donate 
                    </Link> */}

                    {user ? (
                        <>
                            <Link to="/new-post" className="text-black bg-blue-600 px-3 py-2 rounded-lg font-bold hover:bg-blue-800">
                                New Post
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 w-20 h-10 text-white py-2 px-3 rounded-lg font-bold hover:bg-red-600"
                            >
                                Logout
                            </button>
                            <Link to="/profile" className="flex items-center space-x-3 text-black">
                                <div className="w-10 h-10 flex items-center justify-center rounded-full dark:bg-gray-600 text-white font-extrabold">
                                    {getInitials(user)}
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="text-black bg-green-500 hover:bg-green-300 px-3 py-2 rounded-lg">
                                Login
                            </Link>
                            <Link to="/register" className="text-black bg-blue-500 hover:bg-blue-300 px-3 py-2 rounded-lg">
                                Register
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;