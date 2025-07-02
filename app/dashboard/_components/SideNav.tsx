import Image from 'next/image'
import React from 'react'

const SideNav = () => {
  return (
    <div className='h-screen p-5 shadow-sm border'>
        <div className="logo flex gap-2 items-center justify-center"> 
            <Image src={"/logo.svg"} alt='logo'  width={80} height={80} />
            <h1 className='font-serif font-bold'>Content Ai</h1>

        </div>
    </div>
  )
}

export default SideNav