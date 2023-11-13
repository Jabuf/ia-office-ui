import { AxiosResponse } from 'axios'
import { ApiResponse, axiosInstance } from './APIService'

type CreateSheetsData = {
  fileName: string
}

export type SpreadSheetInfo = {
  parentResId: string
  driveFileInfo: DriveFileInfo
}

export type DriveFileInfo = {
  spreadSheetsId: string
  webContentLink: string | undefined | null
  webViewLink: string | undefined | null
}

export const create = async (
  data: CreateSheetsData,
): Promise<ApiResponse<DriveFileInfo>> => {
  const response: AxiosResponse<ApiResponse<DriveFileInfo>> =
    await axiosInstance.post('/sheets', data)
  return response.data
}

export const getById = async (
  id: string,
): Promise<ApiResponse<DriveFileInfo>> => {
  const response: AxiosResponse<ApiResponse<DriveFileInfo>> =
    await axiosInstance.get('/sheets', {
      params: { id },
    })
  return response.data
}
