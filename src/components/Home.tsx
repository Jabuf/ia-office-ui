import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextareaAutosize,
} from '@mui/material'
import AccessibleForwardIcon from '@mui/icons-material/AccessibleForward'
import {
  Conv,
  createSpreadsheet,
  getStatus,
  updateCharts,
} from '../api/SpreadsheetService'
import PromptUtils from '../utils/PromptUtils'
import { toast, ToastContainer } from 'react-toastify'
import BaseButton from './BaseButton'
import { DriveFileInfo } from '../api/APIService'

function Home() {
  const startRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (startRef.current) {
      startRef.current.focus()
    }
  }, []) // Empty dependency array ensures that this effect runs only once, when the component is mounted

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
      <header className="flex flex-col bg-slate-900 text-slate-50">
        <div className="flex flex-col h-screen text-3xl items-center justify-center">
          <Button ref={startRef} autoFocus={true} />
          <span className=" pb-16">
            Savez-vous précisement ce que doit contenir votre fichier ?
          </span>
          <div className="flex space-x-5 w-3/4">
            <div className="flex flex-col items-center justify-center space-y-5 self-start">
              <BaseButton
                label="Oui j'ai une bonne idée des tableaux, lignes et colonnes que je souhaite générer"
                onClick={disableAssistedMode}
              />
              <span className="text-lg text-center w-3/4 italic">
                &ldquo;Je veux une feuille avec des tableau par différent taux
                de TVA. Les taux de TVAs sont 20%, 2,1%, 5,5% et 10%. Je veux
                également une feuille avec un tableau récapitulatif. Chaque
                tableau devra contenir la valeur des stocks avec en ligne le
                mois et en colonne l'année et ce pour une entière année
                civile.&rdquo;
              </span>
            </div>
            <div className="flex flex-col items-center justify-center space-y-5  self-start">
              <BaseButton
                label="Non je préfère laisser la main et juste partir d'une idée générale"
                onClick={enableAssistedMode}
              />
              <span className="text-lg text-center w-3/4 italic">
                &ldquo;Je suis un DPO et je veux envoyer un fichier à la CNIL
                dans le cadre de la conformité au RGPD.&rdquo;
              </span>
            </div>
          </div>
        </div>
        <div className="flex h-screen w-screen items-center justify-center">
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
              <BaseButton
                label={'générer'}
                onClick={handleApiCreation}
                disabled={loading.spreadsheet}
                loading={loading.spreadsheet}
              />
              {fileUrls && fileUrls.webViewLink && (
                <BaseButton
                  disabled={loading.spreadsheet}
                  href={fileUrls.webViewLink}
                  label={'voir'}
                />
              )}
            </div>
          </div>
        </div>
        <div className="p-5">
          <BaseButton
            onClick={checkStatusOpenApi}
            label="Status"
            loading={loading.status}
          />
        </div>
      </header>
    </div>
  )
}

export default Home
