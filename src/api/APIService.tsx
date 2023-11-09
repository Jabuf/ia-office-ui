import axios from 'axios'

export type ApiResponse<T> = {
  code: number
  data: T
}

export const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: parseInt(process.env.REACT_APP_API_DEFAULT_TIMEOUT || '300000'),
})
