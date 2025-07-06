"use client"

import {FileClock, HomeIcon, Settings, WalletCards} from "lucide-react"
import Image from 'next/image'
import Link from "next/link"

import { usePathname } from "next/navigation"
import React, { useEffect } from 'react'
import UsageTrack from "./UsageTrack"

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
            path : "/dashboard/settings"
        }
    ]

    const path = usePathname();
    useEffect(()=>{
        console.log(path)
    }, [])

  return (
    <div className='h-screen p-5 shadow-sm border bg-white relative'>
        <div className="logo flex gap-2 items-center justify-center border-b-2 pb-2"> 
            <Image src={"/logo.svg"} alt='logo'  width={80} height={80} />
            <h1 className='font-serif font-bold'>Content Ai</h1>
        </div>
        <div className="my-10">
            
            {MenuList.map((menu , index)=>(
                <Link href={menu.path} key={index}>
                    <div key={index} className={`flex gap-2 mb-2 p-3 hover:bg-blue-600 hover:text-white rounded-lg cursor-pointer items-center ${path == menu.path && "bg-blue-600 text-white"}`}>
                        <menu.icon className="h-6 w-6" />
                        <h2 className="text-lg">{menu.name}</h2>
                    </div>
                </Link>
            ))}
        </div>

        <div className="absolute bottom-10 left-0 w-full">
            <UsageTrack/>
        </div>
    </div>
  )
}

export default SideNav