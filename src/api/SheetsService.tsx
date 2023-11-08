import { AxiosResponse } from 'axios'
import { ApiResponse, axiosInstance } from './APIService'

type CreateSheetsData = {
  fileName: string
}
export type DriveFileUrls = {
  spreadSheetsId: string
  webContentLink: string | undefined | null
  webViewLink: string | undefined | null
}

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
