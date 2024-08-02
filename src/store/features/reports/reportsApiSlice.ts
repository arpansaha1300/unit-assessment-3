import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export type IReportData = {
  reportCategory: string
  reportName: string
  source: string
  reportDesc: string
  lastReportDate: string
}

type IFinancialAccountReport = {
  financialAccountNumber: string
  reportData: IReportData[]
}

type IReportList = {
  reportList: IFinancialAccountReport[]
}

export const reportsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/mocks' }),
  reducerPath: 'reports',
  tagTypes: ['reports'],
  endpoints: build => ({
    getReports: build.query<IReportData[], void>({
      query: () => `/iot-report.json`,
      transformResponse: (res: IReportList) => {
        return res.reportList[0].reportData
      },
      providesTags: (_result, _error) => [{ type: 'reports' }],
    }),
  }),
})

export const { useGetReportsQuery } = reportsApiSlice
