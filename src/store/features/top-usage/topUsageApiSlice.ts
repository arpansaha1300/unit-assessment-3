import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IUsage {
  mobileNumber: number
  mobileNumberStatus: string
  dataUsage: number
  position: number
}

interface IFinancialAccountUsage {
  financialAccountNumber: string
  usages: IUsage[]
}

interface ITopUsageResponse {
  usageDataList: IFinancialAccountUsage[]
}

export const topUsageApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/mocks',
  }),
  reducerPath: 'top-usage',
  tagTypes: ['top-usage'],
  endpoints: build => ({
    getTopUsage: build.query<IUsage[], void>({
      query: () => `/iot-top-usage.json`,
      transformResponse: (res: ITopUsageResponse) => {
        return res.usageDataList[0].usages
      },
      providesTags: (_result, _error) => [{ type: 'top-usage' }],
    }),
  }),
})

export const { useGetTopUsageQuery } = topUsageApiSlice
