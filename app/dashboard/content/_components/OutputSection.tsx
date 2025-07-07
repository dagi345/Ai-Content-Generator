"use client";

import React, { useEffect, useRef, useState } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from "sonner";

// Dynamically import the Editor with no SSR
const ToastEditor = dynamic(
  () => import('@toast-ui/react-editor').then(mod => mod.Editor),
  { 
    ssr: false,
    loading: () => (
      <div className="h-[500px] w-full flex items-center justify-center bg-gray-50 rounded-b-lg">
        <div className="animate-pulse text-gray-500">Loading editor...</div>
      </div>
    )
  }
);

interface Props {
    aiOutput: string;
}

function OutputSection({ aiOutput }: Props) {
    const editorRef = useRef<any>(null);
    const [isEditorReady, setIsEditorReady] = useState(false);

    const copyOutput = async () => {
        if (!editorRef.current) {
            toast.error("Editor not ready");
            return;
        }
        
        const editorInstance = editorRef.current.getInstance();
        
        try {
            // Try using the modern Clipboard API first
            const htmlContent = editorInstance.getHTML();
            await navigator.clipboard.writeText(htmlContent);
            toast.success("Content copied successfully!");
        } catch (err) {
            // Fallback to older execCommand method
            try {
                const tempElem = document.createElement('div');
                tempElem.innerHTML = editorInstance.getHTML();
                
                tempElem.style.position = 'fixed';
                tempElem.style.left = '-9999px';
                document.body.appendChild(tempElem);
                
                const range = document.createRange();
                range.selectNodeContents(tempElem);
                
                const selection = window.getSelection();
                if (selection) {
                    selection.removeAllRanges();
                    selection.addRange(range);
                    document.execCommand('copy');
                    selection.removeAllRanges();
                }
                
                document.body.removeChild(tempElem);
                toast.success("Content copied successfully!");
            } catch (fallbackErr) {
                toast.error("Failed to copy content. Please try selecting and copying manually.");
            }
        }
    }

    useEffect(() => {
        if (!editorRef.current || !aiOutput || !isEditorReady) return;
        
        try {
            const editorInstance = editorRef.current.getInstance();
            editorInstance.setMarkdown(aiOutput);
        } catch (err) {
            toast.error("Failed to update editor content");
        }
    }, [aiOutput, isEditorReady]);

    return (
        <div className="bg-white shadow-lg border rounded-lg">
            <div className="flex justify-between items-center p-2">
                <h2 className="flex items-center font-medium text-lg pl-3">Your result</h2>
                <Button 
                    className="bg-blue-600 cursor-pointer hover:bg-blue-500" 
                    onClick={copyOutput}
                    disabled={!isEditorReady}
                >
                    <Copy className="mr-2" /> Copy
                </Button>
            </div>

            <ToastEditor
                ref={editorRef}
                initialValue="Your result will appear here"
                previewStyle="vertical"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                height="500px"
                onLoad={() => setIsEditorReady(true)}
            />
        </div>
    )
}

export default OutputSection