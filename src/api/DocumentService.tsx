import { AxiosError, AxiosResponse } from 'axios'
import {
  ApiResponse,
  axiosInstance,
  displayApiError,
  displayApiSuccess,
  DriveFileInfo,
} from './APIService'

export type DocumentInfo = {
  messages: []
  driveFileInfo: DriveFileInfo
}

const baseUrl = '/documents'

export const createDocument = async (data: {
  text: string
}): Promise<ApiResponse<DocumentInfo> | null> => {
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
