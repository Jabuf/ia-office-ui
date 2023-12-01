import { AxiosError, AxiosResponse } from 'axios'
import {
  ApiResponse,
  axiosInstance,
  displayApiError,
  displayApiSuccess
} from './APIService'

export type DriveFileInfo = {
  fileId: string
  fileName?: string
  fileType?: string
  created: string | undefined | null
  webContentLink: string | undefined | null
  webViewLink: string | undefined | null
}


const baseUrl = '/files'

export const getFiles = async (): Promise<ApiResponse<DriveFileInfo[]> | null> => {
  let res: ApiResponse<DriveFileInfo[]> | null = null
  const startTime = performance.now()

  await axiosInstance
    .get(`${baseUrl}`)
    .then((response: AxiosResponse<ApiResponse<DriveFileInfo[]>>) => {
      const endTime = performance.now()
      displayApiSuccess('fichier', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })
  return res
}
