import React, { useState } from 'react'
import '../styles/Home.css'
import {
  Button,
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
import { RotatingSquare } from 'react-loader-spinner'

function Home() {
  const [fileUrls, setFileUrls] = useState<DriveFileInfo | null>(null)
  const [conv, setConv] = useState<Conv>({
    initialPrompt: PromptUtils.getRandomPrompt(),
    spreadSheetsId: '',
    parentResId: '',
  })
  const [loading, setLoading] = useState(false)

  type Steps = {
    [key: string]: boolean
  }
  const [steps, setSteps] = useState<Steps>({
    graphiques: false,
  })

  const handleStepsChange = (stepName: string) => {
    setSteps((prevSteps) => ({
      ...prevSteps,
      [stepName]: !prevSteps[stepName],
    }))
  }

  const handleApiCreation = () => {
    toast.dismiss()
    void (async () => {
      setLoading(true)

      const response = await createSpreadsheet(conv)

      if (response) {
        conv.spreadSheetsId = response.data.driveFileInfo.spreadSheetsId
        conv.parentResId = response.data.parentResId
        if (steps.graphiques) {
          await updateCharts(conv)
        }

        setFileUrls(response.data.driveFileInfo)
      }
      setLoading(false)
    })()
  }

  const checkStatusOpenApi = () => {
    void (async () => {
      await getStatus()
    })()
  }

  return (
    <div className="Home">
      <header className="App-header space-y-5">
        <Button onClick={checkStatusOpenApi} variant="contained">
          Status
        </Button>
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
          minRows={10}
          placeholder="Enter a value"
          value={conv.initialPrompt}
          className="rounded-2xl text-slate-800 text-xl p-2 border-solid border-2 border-sky-500 w-1/2"
          onChange={(e) =>
            setConv({
              initialPrompt: e.target.value,
              spreadSheetsId: '',
              parentResId: '',
            })
          }
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
          <Button
            onClick={handleApiCreation}
            disabled={loading}
            variant="contained"
          >
            {loading && (
              <RotatingSquare
                height="30"
                width="30"
                color="#1565C0"
                strokeWidth="10"
                ariaLabel="progress-bar-loading"
                wrapperClass="pr-1"
              />
            )}
            start
          </Button>
          {fileUrls && (
            <div>
              {fileUrls.webViewLink && (
                <Button
                  disabled={loading}
                  href={fileUrls.webViewLink}
                  target="_blank"
                  variant="contained"
                >
                  view
                </Button>
              )}
              {fileUrls.webContentLink && (
                <Button
                  href={fileUrls.webContentLink}
                  target="_blank"
                  variant="contained"
                >
                  download
                </Button>
              )}
            </div>
          )}
        </div>
      </header>
    </div>
  )
}

export default Home
