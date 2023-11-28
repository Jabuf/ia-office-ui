import { AxiosError, AxiosResponse } from 'axios'
import {
  ApiResponse,
  axiosInstance,
  displayApiError,
  displayApiSuccess,
  DriveFileInfo,
} from './APIService'

export type Conv = {
  initialPrompt: string
  assistedMode: boolean
  spreadSheetsId?: string
  messages?: []
}

export type SpreadSheetInfo = {
  messages: []
  driveFileInfo: DriveFileInfo
}

const baseUrl = '/spreadsheets'

export const createSpreadsheet = async (
  data: Conv,
): Promise<ApiResponse<SpreadSheetInfo> | null> => {
  let res: ApiResponse<SpreadSheetInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .post(baseUrl, data)
    .then((response: AxiosResponse<ApiResponse<SpreadSheetInfo>>) => {
      const endTime = performance.now()
      displayApiSuccess('fichier', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
}

export const updateCharts = async (
  data: Conv,
): Promise<ApiResponse<SpreadSheetInfo> | null> => {
  let res: ApiResponse<SpreadSheetInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .put(`${baseUrl}/charts`, data)
    .then((response: AxiosResponse<ApiResponse<SpreadSheetInfo>>) => {
      const endTime = performance.now()
      displayApiSuccess('graphiques', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
}

export const getStatus = async (): Promise<void> => {
  await axiosInstance
    .get(`${baseUrl}/status`)
    .then(() => {
      displayApiSuccess('API opérationel')
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })
}
