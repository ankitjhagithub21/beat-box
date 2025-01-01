import {NavLink} from 'react-router-dom'
import SearchBar from './SearchBar'


const Navbar = () => {
  return (
    <nav className='w-full fixed top-0 p-5 z-50  bg-black border-b flex items-center justify-between'>
        <NavLink to="/" className='md:flex hidden  items-center gap-1'>
            <img src="/vite.svg" alt="logo" />
            <span className='text-white font-serif text-xl '>BeatBox</span>
        </NavLink>
       <SearchBar/>
        <div className=' items-center gap-4 md:flex hidden'>
            <NavLink to={"/register"}>Sign up</NavLink>
            <NavLink to={"/login"} className='py-2 px-4 rounded-full bg-white text-black'>Log in</NavLink>
        </div>
    </nav>
  )
}

export default Navbar