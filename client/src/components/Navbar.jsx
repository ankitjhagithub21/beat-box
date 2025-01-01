import {NavLink} from 'react-router-dom'
import { CiSearch } from "react-icons/ci";

const Navbar = () => {
  return (
    <nav className='w-full fixed top-0 p-5 z-50  bg-black border-b flex items-center justify-between'>
        <NavLink to="/" className='md:flex hidden  items-center gap-1'>
            <img src="/vite.svg" alt="logo" />
            <span className='text-white font-serif text-xl '>BeatBox</span>
        </NavLink>
        <div className='flex items-center p-2 gap-2 rounded-full bg-[#2A2A2A] border max-w-md w-full'>
        <CiSearch size={25} />
            <input type="text" placeholder='Search songs...' className='bg-transparent w-full'/>
        </div>
        <div className=' items-center gap-4 md:flex hidden'>
            <button>Sign up</button>
            <button className='py-2 px-4 rounded-full bg-white text-black'>Log in</button>
        </div>
    </nav>
  )
}

export default Navbar