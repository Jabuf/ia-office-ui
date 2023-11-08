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
  })
  const steps = [
    {
      order: 0,
      label: 'création fichier',
      status: progression.create,
    },
    {
      order: 1,
      label: 'ajout tableaux',
      status: progression.create,
    },
    {
      order: 2,
      label: 'ajout données',
      status: progression.data,
    },
    {
      order: 3,
      label: 'ajout graphiques',
      status: progression.graphics,
    },
    {
      order: 4,
      label: 'mise en forme',
      status: progression.styles,
    },
  ]

  const handleApiCreation = () => {
    void (async () => {
      setLoading(true)

      try {
        const response = await createSpreadsheet(conv)
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
  // const handleApiCollect = () => {
  //   void (async () => {
  //     setLoading(true)
  //
  //     try {
  //       const response = await collectInformation(conv)
  //       setConv(response.data)
  //     } finally {
  //       setLoading(false)
  //     }
  //   })()
  // }

  // const handleAnswerChange = (position: number, answer: string) => {
  //   conv.additionalInfo[position].answer = answer
  // }

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
        {!fileUrls && (
          <Button
            onClick={handleApiCreation}
            disabled={loading}
            variant="contained"
          >
            Start
          </Button>
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
        {/*{conv.additionalInfo.length > 0 && (*/}
        {/*  <div>*/}
        {/*    <h2>Additional Information</h2>*/}
        {/*    {conv.additionalInfo.map((e, index) => (*/}
        {/*      <div key={e.question} className="text-base pt-5">*/}
        {/*        <TextField*/}
        {/*          label={e.question}*/}
        {/*          fullWidth={true}*/}
        {/*          className="bg-white rounded-2xl"*/}
        {/*          onChange={(e) => handleAnswerChange(index, e.target.value)}*/}
        {/*        />*/}
        {/*      </div>*/}
        {/*    ))}*/}
        {/*    <Button*/}
        {/*      onClick={handleApiCreation}*/}
        {/*      disabled={loading}*/}
        {/*      variant="contained"*/}
        {/*    >*/}
        {/*      Generate file*/}
        {/*    </Button>*/}
        {/*  </div>*/}
        {/*)}*/}
        {loading && (
          <div>
            <ul className="text-2xl">
              {steps.map((step) => (
                <li
                  key={step.order}
                  className={step.status ? 'text-green-700' : 'text-rose-700'}
                >
                  {step.label}
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
