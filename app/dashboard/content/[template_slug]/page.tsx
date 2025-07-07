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
import { useRouter, useParams } from 'next/navigation'
import { UpdateUsage } from '@/app/(context)/UpdateUsage'
import { UserSubscriptionContext } from '@/app/(context)/UserSubscriptionContext'
import { toast } from 'sonner'

function CreateNewContent() {
    const params = useParams();
    const templateSlug = params?.template_slug as string;
    
    const selectedTemplate: TEMPLATE | undefined = Templates?.find((item) => item.slug === templateSlug);
    const [loading, setLoading] = useState(false);
    const [aiOutput, setAiOutput] = useState<string>('');
    const { isLoaded, isSignedIn, user } = useUser();
    const { TotalUsage } = useContext(TotalUsageContext);
    const { setUpdateCreditUsage } = useContext(UpdateUsage);
    const { userSubscription } = useContext(UserSubscriptionContext);
    const router = useRouter();

    if (!selectedTemplate) {
        return (
            <div className="p-5 flex flex-col items-center justify-center min-h-[50vh]">
                <div className="text-red-500 font-medium mb-4">Template not found</div>
                <Link href="/dashboard">
                    <Button className="bg-blue-600 hover:bg-blue-500">
                        <ArrowLeft className="mr-2" /> Return to Dashboard
                    </Button>
                </Link>
            </div>
        );
    }

    const GenerateAiContent = async (formData: any) => {
        // Check usage limit only for non-subscribed users
        if (!userSubscription && TotalUsage >= 10000) {
            toast.error("You've reached the free usage limit. Please upgrade to continue.");
            router.push('/dashboard/billing');
            return;
        }

        if (!isLoaded || !isSignedIn) {
            toast.error("Please sign in to generate content");
            return;
        }

        setLoading(true);

        try {
            const selectedPrompt = selectedTemplate?.aiPrompt;
            const FinalAiPrompt = JSON.stringify(formData) + ',' + selectedPrompt;

            const res = await fetch('/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: FinalAiPrompt }),
            });

            const data = await res.json();

            if (res.ok) {
                setAiOutput(data.result);
                await SaveIndb(formData, selectedTemplate.slug, data.result);
                toast.success("Content generated successfully!");
            } else {
                throw new Error(data.error || 'Failed to generate content');
            }
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to generate content';
            toast.error(errorMessage);
        } finally {
            setLoading(false);
            setUpdateCreditUsage(Date.now());
        }
    };

    const SaveIndb = async (formData: any, slug: string, aiResponse: string) => {
        if (!isLoaded || !isSignedIn || !user?.primaryEmailAddress?.emailAddress) {
            toast.error('Please sign in to save content');
            return;
        }

        try {
            const res = await fetch('/api/saveOutput', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    formData,
                    templateSlug: slug,
                    aiResponse,
                    userEmail: user.primaryEmailAddress.emailAddress
                }),
            });

            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || 'Failed to save output');
            }
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Failed to save output';
            toast.error(errorMessage);
        }
    }

    return (
        <div className="py-5">
            <Link href="/dashboard" className="p-5">
                <Button className="bg-blue-600 hover:bg-blue-500 cursor-pointer">
                    <ArrowLeft /> Back
                </Button>
            </Link>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 p-5 bg-slate-100">
                <FormSection 
                    selectedTemplate={selectedTemplate} 
                    userFormInput={GenerateAiContent} 
                    loading={loading} 
                />
                <div className="col-span-2">
                    <OutputSection aiOutput={aiOutput} />
                </div>
            </div>
        </div>
    )
}

export default CreateNewContent