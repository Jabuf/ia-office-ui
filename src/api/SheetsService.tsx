import axios, { AxiosResponse } from 'axios'

export type ApiResponse<T> = {
  code: number
  data: T
}

type CreateSheetsData = {
  fileName: string
}
export type DriveFileUrls = {
  webContentLink: string | undefined | null
  webViewLink: string | undefined | null
}

const axiosInstance = axios.create({
  // TODO add check url when starting server
  baseURL: process.env.REACT_APP_API_BASE_URL || '',
  timeout: parseInt(process.env.REACT_APP_API_DEFAULT_TIMEOUT || '5000'),
})

export const create = async (
  data: CreateSheetsData,
): Promise<ApiResponse<DriveFileUrls>> => {
  const response: AxiosResponse<ApiResponse<DriveFileUrls>> =
    await axiosInstance.post('/sheets', data)
  return response.data
}

export const getById = async (
  id: string,
): Promise<ApiResponse<DriveFileUrls>> => {
  const response: AxiosResponse<ApiResponse<DriveFileUrls>> =
    await axiosInstance.get('/sheets', {
      params: { id },
    })
  return response.data
}
