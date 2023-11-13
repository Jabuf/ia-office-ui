import { AxiosError, AxiosResponse } from 'axios'
import { SpreadSheetInfo } from './SheetsService'
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

export const updateExamples = async (
  data: Conv,
): Promise<ApiResponse<SpreadSheetInfo> | null> => {
  let res: ApiResponse<SpreadSheetInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .put(`${baseUrl}/examples`, data)
    .then((response: AxiosResponse<ApiResponse<SpreadSheetInfo>>) => {
      const endTime = performance.now()
      displayApiSuccess('exemples', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
}

export const updateFormulas = async (
  data: Conv,
): Promise<ApiResponse<SpreadSheetInfo> | null> => {
  let res: ApiResponse<SpreadSheetInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .put(`${baseUrl}/formulas`, data)
    .then((response: AxiosResponse<ApiResponse<SpreadSheetInfo>>) => {
      const endTime = performance.now()
      displayApiSuccess('formules', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
}

export const updateGraphics = async (
  data: Conv,
): Promise<ApiResponse<SpreadSheetInfo> | null> => {
  let res: ApiResponse<SpreadSheetInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .put(`${baseUrl}/graphics`, data)
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

export const updateStyles = async (
  data: Conv,
): Promise<ApiResponse<SpreadSheetInfo> | null> => {
  let res: ApiResponse<SpreadSheetInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .put(`${baseUrl}/styles`, data)
    .then((response: AxiosResponse<ApiResponse<SpreadSheetInfo>>) => {
      const endTime = performance.now()
      displayApiSuccess('mise en forme', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
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
