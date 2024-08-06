import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type IDataUsage = {
  date: string // date string
  month: string | null
  dataUsage: number
}

type IDataUsageGraphResponse = {
  financialAccountNumber: string
  totalDataUsage: number
  dataAverage: number
  dataUsage: IDataUsage[]
}

type IDataUsageResponse = {
  dataUsageGraphResponse: IDataUsageGraphResponse[]
}

export const dataUsageApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL + '/mocks',
  }),
  reducerPath: 'data-usage',
  tagTypes: ['data-usage'],
  endpoints: build => ({
    getDataUsage: build.query<IDataUsageGraphResponse, void>({
      query: () => `/data-usage.json`,
      transformResponse: (res: IDataUsageResponse) => {
        return res.dataUsageGraphResponse[0]
      },
      providesTags: (_result, _error) => [{ type: 'data-usage' }],
    }),
  }),
})

export const { useGetDataUsageQuery } = dataUsageApiSlice
