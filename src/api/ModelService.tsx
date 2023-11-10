import { AxiosError, AxiosResponse } from 'axios'
import { DriveFileUrls } from './SheetsService'
import {
  ApiResponse,
  axiosInstance,
  displayApiError,
  displayApiSuccess,
} from './APIService'

export type Conv = {
  initialPrompt: string
  additionalInfo: AdditionalInfo[]
  spreadSheetsId: string
  parentResId: string
}

export type AdditionalInfo = {
  question: string
  answer: string
}

const baseUrl = '/model'

export const createSpreadsheet = async (
  data: Conv,
): Promise<ApiResponse<DriveFileUrls> | null> => {
  let res: ApiResponse<DriveFileUrls> | null = null
  const startTime = performance.now()

  await axiosInstance
    .post(baseUrl, data)
    .then((response: AxiosResponse<ApiResponse<DriveFileUrls>>) => {
      const endTime = performance.now()
      displayApiSuccess('fichier créé', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
}

export const updateData = async (
  data: Conv,
): Promise<ApiResponse<DriveFileUrls>> => {
  const response: AxiosResponse<ApiResponse<DriveFileUrls>> =
    await axiosInstance.put(`${baseUrl}/data`, data)
  return response.data
}

export const updateGraphics = async (
  data: Conv,
): Promise<ApiResponse<DriveFileUrls>> => {
  const response: AxiosResponse<ApiResponse<DriveFileUrls>> =
    await axiosInstance.put(`${baseUrl}/graphics`, data)
  return response.data
}

export const updateStyles = async (
  data: Conv,
): Promise<ApiResponse<DriveFileUrls>> => {
  const response: AxiosResponse<ApiResponse<DriveFileUrls>> =
    await axiosInstance.put(`${baseUrl}/styles`, data)
  return response.data
}
export const collectInformation = async (
  data: Conv,
): Promise<ApiResponse<Conv>> => {
  const response: AxiosResponse<ApiResponse<Conv>> = await axiosInstance.get(
    baseUrl,
    {
      params: data,
    },
  )
  return response.data
}
