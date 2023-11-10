import axios, { AxiosError } from 'axios'
import { toast } from 'react-toastify'

export type ApiResponse<T> = {
  code: number
  data: T
}

export class ApiError {
  code: string
  message: string
  name: string
  statusCode: number

  constructor(code: string, message: string, name: string, statusCode = 500) {
    this.code = code
    this.message = message
    this.name = name
    this.statusCode = statusCode
  }
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: parseInt(process.env.REACT_APP_API_DEFAULT_TIMEOUT || '300000'),
})

export const displayApiSuccess = (title: string, timeMs = -1) => {
  let message = `${title}`
  if (timeMs > 0) {
    message += ` en ${(timeMs / 60000).toFixed(1)}m`
  }
  toast(message, {
    type: 'success',
  })
}

export const displayApiError = (err: AxiosError) => {
  if (err.response?.data) {
    const res = err.response.data as ApiError
    if (res.name && res.message) {
      toast(`${res.name} - ${res.message}`, {
        type: 'error',
      })
    }
  } else {
    toast(`${err.name} - ${err.message}`, {
      type: 'error',
    })
  }
}
