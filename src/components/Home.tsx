import React, { useState } from 'react'
import '../styles/Home.css'
import { Button, TextField } from '@mui/material'
import { DriveFileUrls } from '../api/SheetsService'
import {
  Conv,
  createSpreadsheet,
  updateData,
  updateGraphics,
  updateStyles,
} from '../api/ModelService'
import PromptUtils from '../utils/PromptUtils'
import { ToastContainer } from 'react-toastify'

function Home() {
  const [fileUrls, setFileUrls] = useState<DriveFileUrls | null>(null)
  const [conv, setConv] = useState<Conv>({
    initialPrompt: PromptUtils.getRandomPrompt(),
    additionalInfo: [],
    spreadSheetsId: '',
    parentResId: '',
  })
  const [loading, setLoading] = useState(false)

  const handleApiCreation = () => {
    void (async () => {
      setLoading(true)

      const response = await createSpreadsheet(conv)

      if (response) {
        conv.spreadSheetsId = response.data.spreadSheetsId
        await updateData(conv)
        await updateGraphics(conv)
        await updateStyles(conv)

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
