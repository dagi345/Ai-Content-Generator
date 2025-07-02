import {FileClock, HomeIcon, Settings, WalletCards} from "lucide-react"
import Image from 'next/image'
import React from 'react'

const SideNav = () => {

    const MenuList =[
        {
            name : "Home",
            icon : HomeIcon , 
            path : "/dashboard"
        },
         {
            name : "History",
            icon : FileClock , 
            path : "/dashboard/history"
        },
         {
            name : "Billing",
            icon : WalletCards , 
            path : "/dashboard/billing"
        },
         {
            name : "Setting",
            icon : Settings , 
            path : "/dashboard/setting"
        }
    ]

  return (
    <div className='h-screen p-5 shadow-sm border'>
        <div className="logo flex gap-2 items-center justify-center border-b-2 pb-2"> 
            <Image src={"/logo.svg"} alt='logo'  width={80} height={80} />
            <h1 className='font-serif font-bold'>Content Ai</h1>
        </div>
        <div className="">
            {MenuList.map((menu , index)=>(
                <div className="flex gap-2 mb-2 p-3">
                    <menu.icon/>
                    <h2>{menu.name}</h2>
                </div>

            ))}
        </div>
    </div>
  )
}

export default SideNav