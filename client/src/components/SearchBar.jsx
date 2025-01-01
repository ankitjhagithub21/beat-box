import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setQuery } from '../redux/slices/songSlice';
const SearchBar = () => {
    const [searchTerm,setSearchTerm] = useState('')
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleSubmit = (e) =>{
        e.preventDefault();
        if(searchTerm.trim().length ==0) return;

        dispatch(setQuery(searchTerm))

        navigate("/")
        

    }
  return (
    <form onSubmit={handleSubmit} className='flex items-center p-2 gap-2 rounded-full bg-[#2A2A2A] border max-w-md w-full'>
    <CiSearch size={25} />
        <input type="text" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder='Search songs...' className='bg-transparent w-full'/>
    </form>
  )
}

export default SearchBar