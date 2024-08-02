import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

type Sims = {
  active: number
  inactive: number
  totalSimCount: number
}

type SimStatus = {
  active: number
  suspended: number
  cancelled: number
  lastUpdatedDate: string // date string
}

type SimConnectivity = {
  connected: number
  disconnected: number
  lastUpdatedDate: string // date string
}

type NetworkData = {
  latencyAverage: number
  lastUpdatedDate: string // date string
}

type DeviceDetailsExperience = {
  sims: Sims
  simStatus: SimStatus
  simConnectivity: SimConnectivity
  networkData: NetworkData[]
}

type DeviceDetails = {
  deviceDetailsExperience: DeviceDetailsExperience[]
}

export const iotOverviewApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/mocks' }),
  reducerPath: 'iot-overview',
  tagTypes: ['iot-overview'],
  endpoints: build => ({
    getIotOverview: build.query<DeviceDetailsExperience, void>({
      query: () => `/iot-overview.json`,
      transformResponse: (res: DeviceDetails) => {
        return res.deviceDetailsExperience[0]
      },
      providesTags: (_result, _error) => [{ type: 'iot-overview' }],
    }),
  }),
})

export const { useGetIotOverviewQuery } = iotOverviewApiSlice
