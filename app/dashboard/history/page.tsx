"use client";

import React, { useEffect, useState } from 'react';
import Templates from '@/app/(data)/Templates';
import '@toast-ui/editor/dist/toastui-editor.css';
import Image from 'next/image';
import wordCount from 'word-count';
import { Copy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export interface HistoryItem {
  id: number;
  formData: string;
  airesponse: string;
  templateSlug: string;
  createdBy: string;
  createdAt: string;
}

function History() {
  const [historyData, setHistoryData] = useState<HistoryItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await fetch('/api/getHistory');
        const result = await response.json();
        if (result.success) {
          setHistoryData(result.data);
        } else {
          console.error('Failed to fetch history:', result.error);
        }
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return <div className="p-5">Loading...</div>;
  }

  const copy = (n:any) =>{
    navigator.clipboard.writeText(n)
    toast.success("copied to clipboard")
  }

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-5">Generation History</h2>
      <div className="p-5  shadow-md flex gap-2">
                    <div className="flex items-center gap-2 basis-[25%] shrink-0">
                        
                        <span className="font-semibold">TEMPLATE</span>
                    </div>

                    <div className="line-clamp-2 basis-[25%] shrink-0">
                        <span className="font-semibold">AI RESPONSE</span>
                    </div>

                    <div className="basis-[20%] shrink-0">
                        <span className="font-semibold">DATE</span> 
                    </div>

                    <div className="basis-[5%] shrink-0">
                        <span className="font-semibold">WORDS</span> 
                    </div>

                    <div className="basis-[20%] shrink-0  flex justify-end">
                        <span>COPY</span>
                    </div>

                    
                </div>
      <div className="grid gap-5 ">
        {historyData.map((item) => {
          const result = Templates?.find((t) => t.slug === item.templateSlug);

          return (
            
         


            
                

              <div key={item.id} className="bg-white p-5 rounded-lg shadow-md flex gap-2">
                    <div className="flex items-center gap-2 basis-[25%] shrink-0">
                        {result?.icon && (
                            <Image src={result.icon} alt="icon" width={50} height={50} />
                        )}
                        <span className="font-semibold"></span> {item.templateSlug}
                    </div>

                    <div className="line-clamp-2 basis-[25%] shrink-0">
                        <span className="font-semibold"></span> {item.airesponse}
                    </div>

                    <div className="basis-[20%] shrink-0">
                        <span className="font-semibold"></span> {item.createdAt}
                    </div>

                    <div className="basis-[5%] shrink-0">
                        <span className="font-semibold"></span> {item.airesponse.length}
                    </div>

                    <div className="basis-[20%] shrink-0  flex justify-end">
                        <Button variant="outline" size="sm" className="flex items-center gap-1 cursor-pointer" onClick={() => copy(item.airesponse)}>
                        <Copy className="w-4 h-4"  /> Copy
                        </Button>
                    </div>
                </div>

            
          );
        })}
      </div>
    </div>
);
}


export default History;
