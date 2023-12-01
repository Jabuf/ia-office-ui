import { AxiosError, AxiosResponse } from 'axios'
import {
  ApiResponse,
  axiosInstance,
  displayApiError,
  displayApiSuccess,
} from './APIService'
import { DriveFileInfo } from './FileService'

export type SlideInfo = {
  messages: []
  driveFileInfo: DriveFileInfo
}

const baseUrl = '/slides'

export const createSlide = async (data: {
  text: string
}): Promise<ApiResponse<SlideInfo> | null> => {
  let res: ApiResponse<SlideInfo> | null = null
  const startTime = performance.now()

  await axiosInstance
    .post(baseUrl, data)
    .then((response: AxiosResponse<ApiResponse<SlideInfo>>) => {
      const endTime = performance.now()
      displayApiSuccess('slide', endTime - startTime)
      res = response.data
    })
    .catch((err: AxiosError) => {
      displayApiError(err)
    })

  return res
}
