import { TextareaAutosize } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { DriveFileInfo } from '../api/FileService'
import { createSlide } from '../api/SlideService'
import PromptUtils from '../utils/PromptUtils'
import BaseButton from './base/BaseButton'

function SlidesCreation() {
  const promptRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }, [])

  const [text, setText] = useState<string>(
    PromptUtils.getRandomPrompt('slides'),
  )
  const [loading, setLoading] = useState(false)
  const [fileUrls, setFileUrls] = useState<DriveFileInfo | null>(null)
  const handleApiCreation = () => {
    toast.dismiss()
    void (async () => {
      setLoading(true)
      const response = await createSlide({ text })
      if (response) {
        setFileUrls(response.data.driveFileInfo)
      }
      setLoading(false)
    })()
  }

  return (
    <div className="DocsCreation">
      <header className="flex bg-slate-900 text-slate-50">
        <div className="flex flex-col h-screen w-screen items-center space-y-10">
          <div className="text-2xl justify-center">
            <span>Non fonctionnel pour le moment</span>
          </div>
          <div className="flex w-full justify-center">
            <TextareaAutosize
              ref={promptRef}
              minRows={5}
              placeholder="Enter a value"
              value={text}
              className="rounded-2xl w-1/2 bg-slate-800 text-lg p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate-50"
              onChange={(e) => {
                setText(e.target.value)
              }}
            />
          </div>
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
      </header>
    </div>
  )
}

export default SlidesCreation
