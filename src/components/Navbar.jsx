import React from 'react'

const Navbar = () => {
  return (
    <nav className='w-full fixed top-0 p-5 border-b flex items-center justify-between'>
        <div className='flex items-center gap-1'>
            <img src="/vite.svg" alt="" />
            <span className='text-white font-serif text-xl '>BeatBox</span>
        </div>
        <div>
            <input type="text" />
        </div>
    </nav>
  )
}

export default Navbar