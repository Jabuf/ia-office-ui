import React, { useState } from 'react'
import '../styles/Home.css'
import {
  Button,
  FormControlLabel,
  FormGroup,
  Switch,
  TextField,
} from '@mui/material'
import { DriveFileUrls } from '../api/SheetsService'
import {
  Conv,
  createSpreadsheet,
  updateExamples,
  updateFormulas,
  updateGraphics,
  updateStyles,
} from '../api/ModelService'
import PromptUtils from '../utils/PromptUtils'
import { toast, ToastContainer } from 'react-toastify'

function Home() {
  const [fileUrls, setFileUrls] = useState<DriveFileUrls | null>(null)
  const [conv, setConv] = useState<Conv>({
    initialPrompt: PromptUtils.getRandomPrompt(),
    additionalInfo: [],
    spreadSheetsId: '',
    parentResId: '',
  })
  const [loading, setLoading] = useState(false)

  type Steps = {
    [key: string]: boolean
  }
  const [steps, setSteps] = useState<Steps>({
    exemples: true,
    formules: true,
    graphiques: true,
    style: true,
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
        conv.spreadSheetsId = response.data.spreadSheetsId
        if (steps.exemples) {
          await updateExamples(conv)
        }
        if (steps.formules) {
          await updateFormulas(conv)
        }
        if (steps.graphiques) {
          await updateGraphics(conv)
        }
        if (steps.style) {
          await updateStyles(conv)
        }

        setFileUrls(response.data)
      }
      setLoading(false)
    })()
  }
  return (
    <div className="Home">
      <header className="App-header space-y-5">
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
        <TextField
          multiline={true}
          rows={10}
          placeholder="Enter a value"
          variant="outlined"
          value={conv.initialPrompt}
          className="bg-white rounded-2xl"
          onChange={(e) =>
            setConv({
              initialPrompt: e.target.value,
              additionalInfo: conv.additionalInfo,
              spreadSheetsId: '',
              parentResId: '',
            })
          }
        />
        <FormGroup>
          {Object.keys(steps).map((stepName) => (
            <FormControlLabel
              control={<Switch defaultChecked />}
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
