import React from 'react'
import { FaSearch } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


function Header() {
    // importing the user from the store using the useSelector hook it state.user becauses we named it as user in slice
    const currentUser = useSelector((state)=>state.user)

    
    return (
        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center mx-auto max-w-6xl p-3'>
                <h1 className='flex text-sm md:text-2xl font-bold flex-wrap'>
                    <span className=' text-slate-500 font-serif'>SLG</span>
                    <span className=' text-slate-700 font-serif'>Estates</span>
                </h1>
                <form className=' bg-slate-100 p-3 rounded-lg flex  justify-around items-center '>
                    <input type='text' placeholder='search...' className='bg-transparent focus:outline-none w-24 md:w-64' />
                    <FaSearch className=' text-slate-600' />
                </form>
                <ul className='flex gap-4'>
                    <Link to='/' >
                        <li className='hidden md:inline text-slate-700 hover:text-slate-600 hover:underline'>Home</li>
                    </Link>
                    <Link to='/about' >
                        <li className='hidden md:inline text-slate-700 hover:text-slate-600 hover:underline'>About</li>
                    </Link>
                    <Link to='/profile'>
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar}
                                alt='profile'
                            />
                        ) : (
                            <li className=' text-slate-700 hover:underline'> profile</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header