"use client"
import React, { useState } from 'react'
import SearchSection from './_components/SearchSection'
import TemplateListSection from './_components/TemplateListSection'

const Dashboard = () => {
    const [UserSearchInput, setUserSearchInput] = useState <String>()
  return (
    <div>
        <SearchSection onSearchInput= {(value:String) => setUserSearchInput(value)}/>

        <TemplateListSection UserSearchInput ={UserSearchInput}/>
    </div>
  )
}

export default Dashboard