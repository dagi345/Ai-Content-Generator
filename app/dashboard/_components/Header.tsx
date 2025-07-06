import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { UserButton } from '@clerk/nextjs'
import { SearchIcon } from 'lucide-react'
import React, { useContext } from 'react'

const Header = () => {
  const {userSubscription, setuserSubscription} = useContext(UserSubscriptionContext)
  
  return (
    <div className="shadow-sm border-b-2 bg-white">
        
        <div className="mt-3 ">
          <div className="flex justify-end p-3"><UserButton /></div>
          {!userSubscription &&  <div className="">
            <h2 className='bg-blue-600 text-s text-white rounded-b-sm p-3'>join membership for just 9.99$/Month</h2>
          </div>}
        </div>
    </div>
  )
}

export default Header