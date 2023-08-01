import React, { useState } from 'react'
import '../styles/Home.css'
import { Button } from '@mui/material'
import CreateSheetsFile from '../api/CreateSheetsFile'

function Home() {
  const [data, setData] = useState([])

  const handleApiCall = (apiData: React.SetStateAction<never[]>) => {
    setData(apiData)
  }

  return (
    <div className="Home">
      <header className="App-header">
        <Button
          onClick={() => CreateSheetsFile({ onApiCall: handleApiCall })}
          variant="contained"
        >
          Generate file
        </Button>
        {data.length > 0 && (
          <div>
            <h2>API Data</h2>
          </div>
        )}
      </header>
    </div>
  )
}

export default Home
