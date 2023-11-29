import React, { useEffect, useRef, useState } from 'react'
import { TextareaAutosize } from '@mui/material'
import PromptUtils from '../utils/PromptUtils'
import { toast } from 'react-toastify'
import BaseButton from './base/BaseButton'
import { DriveFileInfo } from '../api/APIService'
import { createDocument } from '../api/DocumentService'

function DocsCreation() {
  const promptRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }, [])

  const [text, setText] = useState<string>(PromptUtils.getRandomPrompt('docs'))
  const [loading, setLoading] = useState(false)
  const [fileUrls, setFileUrls] = useState<DriveFileInfo | null>(null)
  const handleApiCreation = () => {
    toast.dismiss()
    void (async () => {
      setLoading(true)
      const response = await createDocument({ text })
      if (response) {
        setFileUrls(response.data.driveFileInfo)
      }
      setLoading(false)
    })()
  }

  return (
    <div className="DocsCreation">
      <header className="flex flex-col bg-slate-900 text-slate-50">
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col w-1/2">
            <TextareaAutosize
              ref={promptRef}
              minRows={10}
              placeholder="Enter a value"
              value={text}
              className="rounded-2xl bg-slate-800 text-lg p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate-50"
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
            <div className="flex flex-col p-3 space-y-3 justify-center items-center">
              <BaseButton
                label={'générer'}
                onClick={handleApiCreation}
                disabled={loading}
                loading={loading}
              />
              {fileUrls && fileUrls.webViewLink && (
                <BaseButton
                  disabled={loading}
                  href={fileUrls.webViewLink}
                  label={'voir'}
                />
              )}
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default DocsCreation
