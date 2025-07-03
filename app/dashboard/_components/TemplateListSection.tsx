import Templates from '@/app/(data)/Templates'
import React, { useEffect, useState } from 'react'
import TemplateCard from './TemplateCard'

export interface TEMPLATE {
  name: string,
  desc: string,
  icon: string,
  catagory: string,
  slug: string,
  aiPrompt: string,
  form?: FORM[]  // optional array of FORM objects
}

export interface FORM {
  label: string,
  field: string,
  name: string,
  required?: boolean  // optional
}

const TemplateListSection = ({UserSearchInput}:any) => {
    const [templateList, settemplateList] = useState(Templates)
    
    useEffect(() => {

     if (UserSearchInput){

        const filteredData= Templates.filter(item => item.name.toLowerCase().includes(UserSearchInput.toLowerCase()))
        
        settemplateList(filteredData)
     }
     else{
        settemplateList(Templates)
     }

    }, [UserSearchInput])
    
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 p-5 '>
        {templateList.map((item: TEMPLATE, index:number)=>(
            <TemplateCard {...item} key={index}/>
        ))}
    </div>
  )
}

export default TemplateListSection 

