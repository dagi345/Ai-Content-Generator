"use client"

import {FileClock, HomeIcon, Settings, Sparkles, WalletCards} from "lucide-react"
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
            <Link href="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-blue-900">ContentAI</span>
            </Link>
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