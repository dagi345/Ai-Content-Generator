"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

function Billing() {

  const [credits, setcredits] = useState()
  const [monthState, setmonthState] = useState(false)
  const [yearState, setyearState] = useState(false)

  useEffect(() => {
    const IsUserSubscribed = async() =>{
        try {
            const res = await fetch("/api/IsSubscribed")

            const data = await res.json()
            console.log(data)
            
            if (data.isSubscribed){
                if(data.type == "month"){
                    setmonthState(true)
                }else if (data.type == "year"){
                    setyearState(true)
                }
            }

            
            
        } catch (error) {
            console.log(error)
            
        }
        
     }
  IsUserSubscribed()
    
  }, [])
  





  const handleCheckOut = async (plan: string) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        plan: plan,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (data?.url) {
      window.location.href = data.url; // Redirect to Stripe Checkout
    } else {
      console.error("Failed to get checkout session URL");
    }
  };

  return (
    <div className="bg-[#f6f8fb] flex flex-col items-center justify-center px-4 py-10">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center text-gray-800">
       
        {monthState || yearState ? "You currently have an Active plan" : "Upgrade your plan"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Free Plan */}
        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col justify-between border border-gray-300">
          <div>
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">Free</h3>
            <p className="text-3xl font-bold text-gray-800 mb-6">
              0$<span className="text-base font-normal"> /month</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>✓ 10,000 Words/Month</li>
              <li>✓ 50+ Content Templates</li>
              <li>✓ Unlimited Download & Copy</li>
              <li>✓ 1 Month of History</li>
            </ul>
          </div>
          
        </div>

        {/* Monthly Pro Plan */}
        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col justify-between border-2 border-blue-500">
          <div>
            <h3 className="text-2xl font-semibold text-blue-700 mb-2">
              Monthly
            </h3>
            <p className="text-3xl font-bold text-blue-700 mb-6">
              9.99$<span className="text-base font-normal"> /month</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>✓ 100,000 Words/Month</li>
              <li>✓ 50+ Template Access</li>
              <li>✓ Unlimited Download & Copy</li>
              <li>✓ 1 Year of History</li>
            </ul>
          </div>
          <Button
            onClick={() => handleCheckOut("monthly")}
            variant="outline"
            className="mt-8 border-2 border-blue-600 text-blue-600 font-semibold hover:bg-blue-100 transition cursor-pointer"
            disabled={monthState || yearState}
          >
            {monthState ? "Currently Active Plan" : "Get Started"}
          </Button>
        </div>

        {/* Yearly Pro Plan */}
        <div className="bg-white shadow-md rounded-xl p-8 flex flex-col justify-between border-2 border-green-500">
          <div>
            <h3 className="text-2xl font-semibold text-green-700 mb-2">
              Yearly
            </h3>
            <p className="text-3xl font-bold text-green-700 mb-6">
              99.99$<span className="text-base font-normal"> /year</span>
            </p>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>✓ 1,200,000 Words/Year</li>
              <li>✓ 50+ Template Access</li>
              <li>✓ Unlimited Download & Copy</li>
              <li>✓ Priority Support</li>
            </ul>
          </div>
          <Button
            onClick={() => handleCheckOut("yearly")}
            variant="outline"
            className="mt-8 border-2 border-green-600 text-green-600 font-semibold hover:bg-green-100 transition cursor-pointer"
            disabled ={yearState}
          >
            {yearState ? "Currently Active Plan" : "Get Started"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Billing;
