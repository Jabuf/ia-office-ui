import { AxiosError, AxiosResponse } from 'axios'
import {
  ApiResponse,
  axiosInstance,
  displayApiError,
  displayApiSuccess,
} from './APIService'
import { DriveFileInfo } from './FileService'

export type ConvDocument = {
  initialPrompt: string
}

export type DocumentInfo = {
  messages: []
  driveFileInfo: DriveFileInfo
}

const baseUrl = '/documents'

export const createDocument = async (
  data: ConvDocument,
): Promise<ApiResponse<DocumentInfo> | null> => {
  let res: ApiResponse<DocumentInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .post(baseUrl, data)
    .then((response: AxiosResponse<ApiResponse<DocumentInfo>>) => {
      const endTime = performance.now()
      displayApiSuccess('document', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
}
