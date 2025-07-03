import { SearchIcon } from 'lucide-react'
import React from 'react'

const SearchSection = ({onSearchInput}:any) => {
  return (
    <div className='p-7 bg-gradient-to-br from-purple-500 via-purple-700 to-blue-600 flex justify-center items-center text-white flex-col'>
        <h2 className='text-2xl font-bold'>Browse All templates</h2>
        <p className=''>What would you like to create today</p>

        <div className="mt-5 w-full flex justify-center items-center">
            <div className="flex  items-center gap-2 p-2 border rounded-md bg-white xsm:w-[100%] md:w-[45%]">
                <SearchIcon className='text-black'/>
                <input  onChange={(event) => onSearchInput(event.target.value)}  className='bg-transparent border-none focus:outline-none text-black placeholder:text-gray w-full' type='text' placeholder='Search ...'/>
            </div>
        </div>
    </div>
  )
}

export default SearchSection