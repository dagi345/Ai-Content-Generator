"use client"

import React, { useState } from 'react'
import OutputSection from '../_components/OutputSection'
import FormSection from '../_components/FormSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'


interface PROPS {
    params :{
        'template_slug':string
    }
}

function CreateNewContent(props:PROPS) {

    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == props.params['template_slug']);

    const [Loading, setLoading] = useState(false)
    const [aiOutput, setaiOutput] = useState<string>('');

     if (!selectedTemplate) {
            return <div className="p-5 text-red-500">Template not found.</div>;
        }



        const GenerateAiContent = async (formData: any) => {
            setLoading(true);

            const selectedPrompt = selectedTemplate?.aiPrompt;
            const FinalAiPrompt = JSON.stringify(formData) + ',' + selectedPrompt;

            

            try {
                const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: FinalAiPrompt }),
                });

                const data = await res.json();

                if (res.ok) {
                    // console.log('Gemini result:', data.result);
                    setaiOutput(data.result)
                // setResult(data.result); // or whatever you want to do
                } else {
                    console.error('Backend error:', data.error);
                }
            } catch (err) {
                console.error('Fetch failed:', err);
            }

            setLoading(false);
};



  return (

    <div className="py-5">

        <Link href={'/dashboard'} className='p-5'>
            <Button className='bg-blue-600 hover:bg-blue-500 cursor-pointer'> <ArrowLeft /> Back</Button>

        </Link>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-slate-100'>
            <FormSection selectedTemplate = {selectedTemplate} userFormInput={(v:any)=> GenerateAiContent(v)} loading= {Loading}/>
            <div className="col-span-2">
                <OutputSection aiOutput={aiOutput}/>
            </div>
        </div>
    </div>
  )
}


export default CreateNewContent