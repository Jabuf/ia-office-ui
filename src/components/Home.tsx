import React, { useState } from 'react'
import '../styles/Home.css'
import { Button, TextField } from '@mui/material'
import { DriveFileUrls } from '../api/SheetsService'
import {
  collectInformation,
  Conv,
  createSpreadsheet,
} from '../api/ModelService'

function Home() {
  const [fileUrls, setFileUrls] = useState<DriveFileUrls | null>(null)
  const [conv, setConv] = useState<Conv>({
    prompt: 'Je veux pouvoir lister mes dépenses en vacances.',
    additionalInfo: [],
  })
  const [loading, setLoading] = useState(false)

  const handleApiCreation = () => {
    void (async () => {
      setLoading(true)

      try {
        const response = await createSpreadsheet(conv)
        setFileUrls(response.data)
      } finally {
        setLoading(false)
      }
    })()
  }
  const handleApiCollect = () => {
    void (async () => {
      setLoading(true)

      try {
        const response = await collectInformation(conv)
        setConv(response.data)
      } finally {
        setLoading(false)
      }
    })()
  }

  const handleAnswerChange = (position: number, answer: string) => {
    conv.additionalInfo[position].answer = answer
  }

  return (
    <div className="Home">
      <header className="App-header space-y-5">
        <TextField
          multiline={true}
          rows={5}
          placeholder="Enter a value"
          variant="outlined"
          value={conv.prompt}
          className="bg-white rounded-2xl"
          onChange={(e) =>
            setConv({
              prompt: e.target.value,
              additionalInfo: conv.additionalInfo,
            })
          }
        />
        {conv.additionalInfo.length == 0 && (
          <Button
            onClick={handleApiCollect}
            disabled={loading}
            variant="contained"
          >
            Start
          </Button>
        )}
        {conv.additionalInfo.length > 0 && (
          <div>
            <h2>Additional Information</h2>
            {conv.additionalInfo.map((e, index) => (
              <div key={e.question} className="text-base pt-5">
                <TextField
                  label={e.question}
                  fullWidth={true}
                  className="bg-white rounded-2xl"
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                />
              </div>
            ))}
            <Button
              onClick={handleApiCreation}
              disabled={loading}
              variant="contained"
            >
              Generate file
            </Button>
          </div>
        )}
        {fileUrls && (
          <div>
            {fileUrls.webViewLink && (
              <Button
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
      </header>
    </div>
  )
}

export default Home
