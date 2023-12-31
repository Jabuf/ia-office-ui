import { TextareaAutosize } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { toast } from 'react-toastify'
import { DriveFileInfo } from '../api/FileService'
import { Conv, createSpreadsheet } from '../api/SpreadsheetService'
import BaseButton from './base/BaseButton'
import PromptUtils from '../utils/PromptUtils'
import BaseCarousel from './base/BaseCarousel'

function SheetsCreation() {
  const promptRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }, [])

  const [conv, setConv] = useState<Conv>({
    initialPrompt: '',
    assistedMode: true,
  })
  const [prompts, setPrompts] = useState<string[]>(
    PromptUtils.promptsSheets.assisted,
  )
  const [loading, setLoading] = useState(false)
  const [fileUrls, setFileUrls] = useState<DriveFileInfo | null>(null)
  const handleApiCreation = () => {
    toast.dismiss()
    void (async () => {
      setLoading(true)
      const response = await createSpreadsheet(conv)

      if (response) {
        conv.spreadSheetsId = response.data.driveFileInfo.fileId
        conv.messages = response.data.messages
        setFileUrls(response.data.driveFileInfo)
      }
      setLoading(false)
    })()
  }

  const switchAssistedMode = (enabled: boolean) => {
    setConv((prevConv) => ({
      ...prevConv,
      assistedMode: enabled,
    }))
    setPrompts(PromptUtils.promptsSheets[enabled ? 'assisted' : 'instructions'])
  }

  const classesSelected = 'border-2 border-slate-50 rounded-xl p-0.5'

  return (
    <div className="SheetsCreation">
      <header className="flex text-slate-50">
        <div className="flex flex-col h-screen w-screen items-center space-y-10">
          <div className="text-2xl justify-center">
            <span>
              Savez-vous précisement ce que doit contenir votre fichier ?
            </span>
          </div>
          <div className="flex flex-row w-3/4 space-x-3 justify-center">
            <div
              onClick={() => switchAssistedMode(false)}
              className={!conv.assistedMode ? classesSelected : ''}
            >
              <BaseButton label="Oui j'ai une bonne idée des tableaux que je souhaite générer" />
            </div>
            <div
              onClick={() => switchAssistedMode(true)}
              className={conv.assistedMode ? classesSelected : ''}
            >
              <BaseButton label="Non je préfère laisser la main et juste exprimer une idée générale" />
            </div>
          </div>
          <div className="flex w-full justify-center">
            <TextareaAutosize
              ref={promptRef}
              minRows={7}
              placeholder="Que doit contenir votre document ?"
              value={conv.initialPrompt}
              className="rounded-2xl w-1/2 bg-cyan-800 text-lg p-5 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-slate-50"
              onChange={(e) => {
                setConv({
                  initialPrompt: e.target.value,
                  assistedMode: conv.assistedMode,
                })
              }}
            />
          </div>
          {/*TODO extract these buttons into a component*/}
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
          <BaseCarousel content={prompts} />
        </div>
      </header>
    </div>
  )
}

export default SheetsCreation
