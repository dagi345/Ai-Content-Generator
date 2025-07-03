"use client"

import React, { useState } from 'react'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Image from 'next/image';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface PROPS {
    selectedTemplate?: TEMPLATE
    userFormInput: any
}


function FormSection({selectedTemplate , userFormInput}:PROPS) {

    const [FormData, setFormData] = useState<any>()

    if (!selectedTemplate) {
            return <div className="p-5 text-red-500">Template not found.</div>;
        }

    const onsubmit= (e:any) =>{
        e.preventDefault();
        userFormInput(FormData)
    }

    const handleInputChange= (event:any)=>{
       const {name , value} = event.target;
       setFormData({...FormData, [name]:value})
    }

  return (
    <div className='p-5 shadow-md border rounded-lg bg-white '>
        <Image src={selectedTemplate?.icon} alt='icon' width={70} height={70} />
        <h2 className='font-bold text-2xl text-blue-600'>{selectedTemplate.name}</h2>
        <p className='text-gray-500 text-sm'>{selectedTemplate?.desc}</p>

        <form action="" onSubmit={onsubmit}>
            {selectedTemplate?.form?.map((item , index)=>(
                <div className="my-2 flex flex-col gap-2 mb-7">
                    <label htmlFor="">{item.label}</label>
                    {item.field == "input"? <Input name={item.name} required={item.required} onChange={handleInputChange}/> : item.field == "Textarea"? <Textarea name={item.name} required={item.required} onChange={handleInputChange}/> :null }
                </div>
            ))}

            <Button  type="submit"  className='bg-blue-600 hover:bg-blue-500 w-full py-6'> Generate content</Button>
        </form>
    </div>
  )
}

export default FormSection