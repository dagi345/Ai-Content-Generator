import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UserButton } from '@clerk/nextjs'
import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React, { useContext } from 'react'

const Header = () => {
  const {userSubscription, setuserSubscription} = useContext(UserSubscriptionContext)
  
  return (
    <div className="shadow-sm border-b-2 bg-white">
        <div className="mt-3 ">
          <div className="flex justify-end p-3 ">
            <div style={{ transform: 'scale(1.5)' }} className='pr-5 border-red-50'>
              <UserButton />
            </div>

          </div>
          
          <Link href={"/dashboard/billing"} className='cursor-pointer'>
          {!userSubscription &&  
          <div className="">
            <h2 className='bg-blue-600 text-s text-white rounded-b-sm p-3'>join membership for just 9.99$/Month</h2>
          </div>}
          </Link>

        </div>
    </div>
  )
}

export default Header