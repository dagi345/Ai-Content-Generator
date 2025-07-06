'use client'

import React, { useState } from 'react'
import SideNav from './_components/SideNav';
import Header from './_components/Header';
import { Toaster } from 'sonner';
import { TotalUsageContext } from '../(context)/TotalUsageContext';
import { UserSubscriptionContext } from '../(context)/UserSubscriptionContext';
import { UpdateUsage } from '../(context)/UpdateUsage';


const layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {

  const [TotalUsage, setTotalUsage] = useState<Number>(0)
  const [userSubscription, setuserSubscription] = useState<string>("")
  const [UpdateCreditUsage, setUpdateCreditUsage] = useState()

  return (

    <TotalUsageContext.Provider value={{TotalUsage, setTotalUsage}}> 
    <UserSubscriptionContext.Provider value={{userSubscription, setuserSubscription}}>
      <UpdateUsage.Provider value={{UpdateCreditUsage, setUpdateCreditUsage}}>
    <div className="bg-slate-100 h-screen">

        <div className="md:w-64 hidden md:block fixed ">
            <SideNav/> 
        </div>
        
        <div className='md:ml-64 '>
             <Header />
            {children}
                <Toaster richColors />
            </div>

    </div>
    </UpdateUsage.Provider>
    </UserSubscriptionContext.Provider>
  </TotalUsageContext.Provider>
  )
}

export default layout