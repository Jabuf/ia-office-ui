import axios from 'axios'
import React from 'react'

// TODO should be in a env file
const baseApi = 'https://ia-office-api.netlify.app/api/v1/'

interface ApiCallProps {
  onApiCall: (data: any) => void
}

const CreateSheetsFile: React.FC<ApiCallProps> = ({ onApiCall }) => {
  const fetchData = () => {
    axios
      .get(baseApi)
      .then((response) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        onApiCall(response.data)
      })
      .catch((error) => {
        // console.error('Error fetching data:', error)
      })
  }
  return null
}

export default CreateSheetsFile
