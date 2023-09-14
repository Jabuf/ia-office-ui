import React, { useState } from 'react'
import '../styles/Home.css'
import { Button } from '@mui/material'
import { DriveFileUrls, getById } from '../api/SheetsService'

function Home() {
  const [fileUrls, setFileUrls] = useState<DriveFileUrls | null>(null)
  const [loading, setLoading] = useState(false)

  const handleApiCall = () => {
    void (async () => {
      setLoading(true)

      try {
        const response = await getById(
          '11ealfyg233RFd8ZbP-MLC5t-QUz1UKB4VbeXYuJkbuc',
        )
        setFileUrls(response.data)
      } finally {
        setLoading(false)
      }
    })()
  }

  return (
    <div className="Home">
      <header className="App-header">
        <Button onClick={handleApiCall} disabled={loading} variant="contained">
          Generate file
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
      </header>
    </div>
  )
}

export default Home
