import React, { useRef, useState } from 'react'
import '../styles/Home.css'
import {
  FormControlLabel,
  FormGroup,
  Switch,
  TextareaAutosize,
} from '@mui/material'
import { DriveFileInfo } from '../api/SheetsService'
import {
  Conv,
  createSpreadsheet,
  getStatus,
  updateCharts,
} from '../api/ModelService'
import PromptUtils from '../utils/PromptUtils'
import { toast, ToastContainer } from 'react-toastify'
import BaseButton from './BaseButton'

function Home() {
  const [conv, setConv] = useState<Conv>({
    initialPrompt: PromptUtils.getRandomPrompt(),
    assistedMode: false,
  })
  const [loading, setLoading] = useState({
    status: false,
    spreadsheet: false,
  })

  const promptRef = useRef<HTMLTextAreaElement | null>(null)
  const enableAssistedMode = () => {
    conv.assistedMode = true
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }

  const disableAssistedMode = () => {
    conv.assistedMode = false
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }

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
      setLoading({ status: false, spreadsheet: true })
      const response = await createSpreadsheet(conv)

      if (response) {
        conv.spreadSheetsId = response.data.driveFileInfo.spreadSheetsId
        conv.messages = response.data.messages
        if (steps.graphiques) {
          await updateCharts(conv)
        }

        setFileUrls(response.data.driveFileInfo)
      }
      setLoading({ status: false, spreadsheet: false })
    })()
  }

  const checkStatusOpenApi = () => {
    void (async () => {
      setLoading({ status: true, spreadsheet: false })
      await getStatus()
      setLoading({ status: false, spreadsheet: false })
    })()
  }

  return (
    <div className="Home">
      <header className="App-header space-y-5">
        <div className="flex flex-col items-center justify-center h-screen">
          <span>
            Savez-vous précisement ce que doit contenir votre fichier ?
          </span>
          <div className="flex space-x-5">
            <BaseButton
              label="Oui j'ai une bonne idée des tableaux, lignes et colonnes que je souhaite générer"
              onClick={disableAssistedMode}
            ></BaseButton>
            <BaseButton
              label="Non je préfère laisser la main et juste partir d'une idée générale"
              onClick={enableAssistedMode}
            ></BaseButton>
          </div>
        </div>
        {/*TODO place somewhere else*/}
        <BaseButton
          onClick={checkStatusOpenApi}
          label="Status"
          loading={loading.status}
        />
        <div>
          <ToastContainer
            position="top-right"
            hideProgressBar={false}
            newestOnTop={false}
            autoClose={false}
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
        <TextareaAutosize
          ref={promptRef}
          minRows={10}
          placeholder="Enter a value"
          value={conv.initialPrompt}
          className="rounded-2xl bg-slate-800 text-lg p-5 border-solid border-0 border-slate-50 w-1/2"
          onChange={(e) => {
            setConv({
              initialPrompt: e.target.value,
              assistedMode: conv.assistedMode,
            })
          }}
        />
        <FormGroup>
          {Object.keys(steps).map((stepName) => (
            <FormControlLabel
              control={<Switch />}
              label={stepName}
              onChange={() => handleStepsChange(stepName)}
            />
          ))}
        </FormGroup>
        <div>
          <BaseButton
            label={'générer'}
            onClick={handleApiCreation}
            disabled={loading.spreadsheet}
            loading={loading.spreadsheet}
          />
          {fileUrls && (
            <div>
              {fileUrls.webViewLink && (
                <BaseButton
                  disabled={loading.spreadsheet}
                  href={fileUrls.webViewLink}
                  label={'voir'}
                />
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default Home
