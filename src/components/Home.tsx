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

function Home() {
  const [fileUrls, setFileUrls] = useState<DriveFileUrls | null>(null)
  const [conv, setConv] = useState<Conv>({
    initialPrompt: 'Je veux pouvoir lister mes dépenses en vacances.',
    additionalInfo: [],
    spreadSheetsId: '',
    parentResId: '',
  })
  const [loading, setLoading] = useState(false)
  const [progression] = useState({
    create: false,
    data: false,
    graphics: false,
    styles: false,
    createTime: '0',
  })
  const steps = [
    {
      order: 0,
      label: 'création fichier et tableaux',
      status: progression.create,
      time: progression.createTime,
    },
    {
      order: 1,
      label: 'ajout données',
      status: progression.data,
      time: '0',
    },
    {
      order: 2,
      label: 'ajout graphiques',
      status: progression.graphics,
      time: '0',
    },
    {
      order: 3,
      label: 'mise en forme',
      status: progression.styles,
      time: '0',
    },
  ]

  const handleApiCreation = () => {
    void (async () => {
      setLoading(true)

      try {
        const start = performance.now()
        const response = await createSpreadsheet(conv)
        const end = performance.now()
        progression.createTime = ((end - start) / 60000).toFixed(1)

        conv.spreadSheetsId = response.data.spreadSheetsId
        progression.create = true
        await updateData(conv)
        progression.data = true
        await updateGraphics(conv)
        progression.graphics = true
        await updateStyles(conv)
        progression.styles = true

        setFileUrls(response.data)
      } finally {
        setLoading(false)
      }
    })()
  }

  return (
    <div className="Home">
      <header className="App-header space-y-5">
        <TextField
          multiline={true}
          rows={5}
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
        {(loading || fileUrls) && (
          <div>
            <ul className="text-2xl">
              {steps.map((step) => (
                <li
                  key={step.order}
                  className={step.status ? 'text-green-700' : 'text-rose-700'}
                >
                  {step.label} - {step.time}m
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>
    </div>
  )
}

export default Home
