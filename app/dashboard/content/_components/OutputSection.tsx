import React, { useEffect, useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';
import { toast } from "sonner";

interface PROPS {
    aiOutput: string
}

function OutputSection({aiOutput}: PROPS) {
    const editorRef: any = useRef(null);

    const copyOutput = () => {
        const editorInstance = editorRef.current.getInstance();
        
        // Get both markdown and HTML content
        const markdownContent = editorInstance.getMarkdown();
        const htmlContent = editorInstance.getHTML();

        // Create a temporary div to parse HTML
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = htmlContent;

        // Get text content (preserves emojis and basic formatting)
        const plainText = tempDiv.textContent || tempDiv.innerText || markdownContent;

        if (plainText) {
            navigator.clipboard.writeText(plainText)
                .then(() => {
                    toast.success("Copied to clipboard!");
                })
                .catch(() => {
                    toast.error("Copy failed");
                });
        }
    }

    useEffect(() => {
        const editorInstance = editorRef.current.getInstance()
        editorInstance.setMarkdown(aiOutput);
    }, [aiOutput])
    
    return (
        <div className='bg-white shadow-lg border rounded-lg'>
            <div className="flex justify-between item-center p-2">
                <h2 className='flex items-center font-medium text-lg pl-3'>Your result</h2>
                <Button className='bg-blue-600 cursor-pointer hover:bg-blue-500' onClick={copyOutput}><Copy /> Copy</Button>
            </div>

            <Editor
                ref={editorRef}
                initialValue="Your result will appear here"
                previewStyle="vertical"
                initialEditType="wysiwyg"
                useCommandShortcut={true}
                height="500px"
                onChange={() => console.log(editorRef.current.getInstance().getMarkdown())}
            />
        </div>
    )
}

export default OutputSection