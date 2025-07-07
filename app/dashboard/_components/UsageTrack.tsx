"use client"

import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { UpdateUsage } from '@/app/(context)/UpdateUsage'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'


import React, { useContext, useEffect, useState } from 'react'

 function UsageTrack() {
    const [responseData, setresponseData] = useState<{ airesponse: string }[]>([])
    const {TotalUsage, setTotalUsage} = useContext(TotalUsageContext)
    const {userSubscription, setuserSubscription} = useContext(UserSubscriptionContext)
    const {UpdateCreditUsage, setUpdateCreditUsage} = useContext(UpdateUsage)
    
    const [credits, setcredits] = useState(0)

    useEffect(() => {
        const getWords = async () => {
        try {
            const response = await fetch('/api/getWords');
            const data = await response.json();
            setresponseData(data.data)
            console.log(data); //Log or do something with data

        } catch (error) {
            console.error('Failed to fetch word count:', error);
        }
    };
     
    getWords()
    IsUserSubscribed()

    }, [])

    const getWords = async () => {
        try {
            const response = await fetch('/api/getWords');
            const data = await response.json();
            setresponseData(data.data)
            console.log(data); //Log or do something with data

        } catch (error) {
            console.error('Failed to fetch word count:', error);
        }
    };
     
    

    useEffect(() => {
        getWords()
    }, [UpdateCreditUsage])
    
    

     useEffect(() => {
        if (!responseData) return;
            let total=0;

        responseData.forEach(element => {
            total+= element.airesponse?.length 
        });

        setTotalUsage(total)
        

        
     }, [responseData])
     

     const IsUserSubscribed = async() =>{
        try {
            const res = await fetch("/api/IsSubscribed")

            const data = await res.json()
            console.log(data)
            
            
            
            if (data.isSubscribed){
                setuserSubscription(true)
                
                console.log(data)
            }

            if(data.type == "month"){
                setcredits(100000)
            }else if (data.type == "year"){
                setcredits(1200000)
            }else{
                setcredits(10000)
            }
            
        } catch (error) {
            console.log(error)
            
        }
        
     }


 const progress = Math.min((TotalUsage / credits) * 100, 100) + "%";


  return (

    <div className='m-2'>
        <div className="bg-blue-600 text-white p-3 rounded-lg">
            <h2 className=' font-medium'>Credits</h2>
            <div className="h-2 my-3 bg-blue-400 w-full rounded-full ">
                <div className="h-2 bg-white  rounded-full transition-all duration-900" style={{width :progress}}></div>
            </div>
            <h2 className='text-sm '>{TotalUsage.toLocaleString()}/{credits.toLocaleString()}Credits used</h2>
        </div>

        <Link href={"/dashboard/billing"}>

        {!userSubscription && <Button variant={'secondary'} className='w-full my-3 border shadow-md cursor-pointer'> Upgrade </Button>}

        </Link>

    </div>
  )
}

export default UsageTrack