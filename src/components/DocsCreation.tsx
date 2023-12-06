import { TextareaAutosize } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ConvDocument,
  createDocument,
  DocumentType,
} from '../api/DocumentService'
import { DriveFileInfo } from '../api/FileService'
import PromptUtils from '../utils/PromptUtils'
import BaseButton from './base/BaseButton'
import BaseExamples from './base/BaseExamples'

function DocsCreation() {
  const promptRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }, [])

  const [conv, setConv] = useState<ConvDocument>({
    initialPrompt: PromptUtils.getRandomPrompt('docs'),
    documentType: 'letter',
  })
  const [loading, setLoading] = useState(false)
  const [fileUrls, setFileUrls] = useState<DriveFileInfo | null>(null)
  const handleApiCreation = () => {
    toast.dismiss()
    void (async () => {
      setLoading(true)
      const response = await createDocument(conv)
      if (response) {
        setFileUrls(response.data.driveFileInfo)
      }
      setLoading(false)
    })()
  }

  const switchDocumentType = (documentType: DocumentType) => {
    setConv((prevConv) => ({
      ...prevConv,
      documentType: documentType,
    }))
  }

  const classesSelected = 'border-2 border-slate-50 rounded-xl p-0.5'

  return (
    <div className="DocsCreation">
      <header className="flex bg-slate-900 text-slate-50">
        <div className="flex flex-col h-screen w-screen items-center space-y-10">
          <div className="text-2xl justify-center">
            <span>Choisissez le format de document qui correspond</span>
          </div>
          <div className="flex flex-row w-3/4 space-x-3 justify-center">
            <div
              onClick={() => switchDocumentType('letter')}
              className={conv.documentType === 'letter' ? classesSelected : ''}
            >
              <BaseButton label="lettre" />
            </div>
            <div
              onClick={() => switchDocumentType('mail')}
              className={conv.documentType === 'mail' ? classesSelected : ''}
            >
              <BaseButton label="email" />
            </div>
            <div
              onClick={() => switchDocumentType('block')}
              className={conv.documentType === 'block' ? classesSelected : ''}
            >
              <BaseButton label="bloc de texte" />
            </div>
            <div
              onClick={() => switchDocumentType('presentation')}
              className={
                conv.documentType === 'presentation' ? classesSelected : ''
              }
            >
              <BaseButton label="document découpé en sections" />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <TextareaAutosize
              ref={promptRef}
              minRows={5}
              placeholder="Enter a value"
              value={conv.initialPrompt}
              className="rounded-2xl w-1/2 bg-slate-800 text-lg p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate-50"
              onChange={(e) => {
                setConv({
                  initialPrompt: e.target.value,
                  documentType: conv.documentType,
                })
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
          <BaseExamples examples={PromptUtils.promptsDocs} />
        </div>
      </header>
    </div>
  )
}

export default DocsCreation
