import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface IAlert {
  id: string
  title: string
  description: string
  date: string // date string
  severity: 'LOW' | 'MEDIUM' | 'HIGH'
}

export const alertsApiSlice = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/mocks' }),
  reducerPath: 'alerts',
  tagTypes: ['alerts'],
  endpoints: build => ({
    getAlerts: build.query<IAlert[], void>({
      query: () => `/alerts.json`,
      providesTags: (_result, _error) => [{ type: 'alerts' }],
    }),
    getNewAlerts: build.query<IAlert[], void>({
      query: () => `/new-alerts.json`,
      providesTags: (_result, _error) => [{ type: 'alerts' }],
    }),
  }),
})

export const { useGetAlertsQuery, useGetNewAlertsQuery } = alertsApiSlice
