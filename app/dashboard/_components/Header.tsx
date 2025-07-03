import { SearchIcon } from 'lucide-react'
import React from 'react'

const Header = () => {
  return (
    <div className="p-5 shadow-sm border-b-2 bg-white">
        <div className='flex gap-2 items-center p-2 border rounded-md max-w-md '>
            <SearchIcon />
            <input type="text" name="" id="" placeholder='Search ... ' className='outline-none ' />
        </div>
        <div className="mt-3 ">
            <h2 className='bg-blue-600 p-1  text-s text-white rounded-b-sm p-3'>join membership for just 9.99$/Month</h2>
        </div>
    </div>
  )
}

export default Header