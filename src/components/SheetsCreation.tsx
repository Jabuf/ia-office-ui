import React, { useEffect, useRef, useState } from 'react'
import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextareaAutosize,
} from '@mui/material'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import {
  Conv,
  createSpreadsheet,
  updateCharts,
} from '../api/SpreadsheetService'
import PromptUtils from '../utils/PromptUtils'
import { toast } from 'react-toastify'
import BaseButton from './base/BaseButton'
import { DriveFileInfo } from '../api/APIService'

interface SheetsCreationProps {
  assistedMode: boolean
}

function SheetsCreation(props: SheetsCreationProps) {
  const promptRef = useRef<HTMLTextAreaElement | null>(null)
  useEffect(() => {
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }, [])

  const [conv, setConv] = useState<Conv>({
    initialPrompt: PromptUtils.getRandomPrompt('sheets'),
    assistedMode: props.assistedMode,
  })
  const [loading, setLoading] = useState(false)
  const [steps, setSteps] = useState<{ [key: string]: boolean }>({
    graphiques: false,
  })

  const handleStepsChange = (stepName: string) => {
    setSteps((prevSteps) => ({
      ...prevSteps,
      [stepName]: !prevSteps[stepName],
    }))
  }

  const [fileUrls, setFileUrls] = useState<DriveFileInfo | null>(null)
  const handleApiCreation = () => {
    toast.dismiss()
    void (async () => {
      setLoading(true)
      const response = await createSpreadsheet(conv)

      if (response) {
        conv.spreadSheetsId = response.data.driveFileInfo.fileId
        conv.messages = response.data.messages
        if (steps.graphiques) {
          await updateCharts(conv)
        }

        setFileUrls(response.data.driveFileInfo)
      }
      setLoading(false)
    })()
  }

  return (
    <div className="SheetsCreation">
      <header className="flex flex-col bg-slate-900 text-slate-50">
        <div className="flex h-screen w-screen items-center justify-center">
          <div className="flex flex-col w-1/2">
            {conv.assistedMode && <AccessibleForwardIcon />}
            <TextareaAutosize
              ref={promptRef}
              minRows={10}
              placeholder="Enter a value"
              value={conv.initialPrompt}
              className="rounded-2xl bg-slate-800 text-lg p-5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-slate-50"
              onChange={(e) => {
                setConv({
                  initialPrompt: e.target.value,
                  assistedMode: conv.assistedMode,
                })
              }}
            />
            <div className="flex flex-col p-3 space-y-3 justify-center items-center">
              <FormGroup>
                {Object.keys(steps).map((stepName) => (
                  <FormControlLabel
                    control={<Switch />}
                    label={stepName}
                    onChange={() => handleStepsChange(stepName)}
                  />
                ))}
              </FormGroup>
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
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default SheetsCreation
