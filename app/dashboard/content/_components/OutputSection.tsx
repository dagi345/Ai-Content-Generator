import React, { useRef } from 'react'
import '@toast-ui/editor/dist/toastui-editor.css';
import { Editor } from '@toast-ui/react-editor';
import { Button } from '@/components/ui/button';
import { Copy } from 'lucide-react';




function OutputSection() {
    const editorRef:any = useRef(null);
  return (
    <div className='bg-white shadow-lg border rounded-lg'>
        <div className="flex justify-between item-center p-2">
            <h2 className='flex items-center font-medium text-lg pl-3'>Your result</h2>
            <Button className='bg-blue-600 cursor-pointer'><Copy /> Copy</Button>
        </div>

        <Editor
        ref = {editorRef}
        initialValue="Your result will appear here"
        previewStyle="vertical"
        initialEditType="wysiwyg"
        useCommandShortcut={true}
        height="500px"
        onChange={()=>console.log(editorRef.current.getInstance().getMarkdown())}
        />
    </div>
  )
}

export default OutputSection