"use client"

import React, { useContext, useState } from 'react'
import OutputSection from '../_components/OutputSection'
import FormSection from '../_components/FormSection'
import { TEMPLATE } from '../../_components/TemplateListSection'
import Templates from '@/app/(data)/Templates'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { ArrowLeft } from 'lucide-react'
import { useUser } from '@clerk/nextjs'
import { TotalUsageContext } from '@/app/(context)/TotalUsageContext'
import { useRouter } from 'next/navigation'
import { UpdateUsage } from '@/app/(context)/UpdateUsage'

interface PROPS {
    params: {
        'template_slug': string
    }
}

function CreateNewContent(props: PROPS) {
    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug == props.params['template_slug']);
    const [Loading, setLoading] = useState(false)
    const [aiOutput, setaiOutput] = useState<string>('');
    const { isLoaded, isSignedIn, user } = useUser();
    const {TotalUsage, setTotalUsage} = useContext(TotalUsageContext)
    const {UpdateCreditUsage, setUpdateCreditUsage} = useContext(UpdateUsage)
    const router= useRouter();

    if (!selectedTemplate) {
        return <div className="p-5 text-red-500">Template not found.</div>;
    }


    const GenerateAiContent = async (formData: any) => {
        if (TotalUsage >= 10000){
            router.push('/dashboard/billing')
        }

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
                setaiOutput(data.result);
                await SaveIndb(formData, selectedTemplate.slug, data.result);
            } else {
                console.error('Backend error:', data.error);
            }
        } catch (err) {
            console.error('Fetch failed:', err);
        }

        setUpdateCreditUsage(Date.now())
        setLoading(false);
    };
    

    const SaveIndb = async (formData: any, slug: any, aiResponse: string) => {
        if (!isLoaded || !isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
            console.error('User not signed in or not loaded');
            return;
        }

        try {
            const res = await fetch('/api/saveOutput', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData: formData,
                    templateSlug: slug,
                    aiResponse: aiResponse,
                    userEmail: user.primaryEmailAddress.emailAddress
                }),
            });

            console.log(res)

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to save output');
            }

            console.log('Saved successfully:', data);
        } catch (error) {
            console.error('Failed to save nigaa:', error);
        }
    }
    return (
        <div className="py-5">
            <Link href={'/dashboard'} className='p-5'>
                <Button className='bg-blue-600 hover:bg-blue-500 cursor-pointer'> <ArrowLeft /> Back</Button>
            </Link>

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-slate-100'>
                <FormSection selectedTemplate={selectedTemplate} userFormInput={(v: any) => GenerateAiContent(v)} loading={Loading} />
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent