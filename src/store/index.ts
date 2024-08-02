import {
  type Action,
  combineSlices,
  configureStore,
  type ThunkAction,
} from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { dataUsageApiSlice } from './features/data-usage/dataUsageApiSlice'
import { topUsageApiSlice } from './features/top-usage/topUsageApiSlice'
import { alertsApiSlice } from './features/alerts/alertsApiSlice'
import { iotOverviewApiSlice } from './features/iot-overview/iotOverviewApiSlice'
import { reportsApiSlice } from './features/reports/reportsApiSlice'

const rootReducer = combineSlices(
  dataUsageApiSlice,
  topUsageApiSlice,
  alertsApiSlice,
  iotOverviewApiSlice,
  reportsApiSlice
)

export type RootState = ReturnType<typeof rootReducer>

export const makeStore = (preloadedState?: Partial<RootState>) => {
  const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware()
        .concat(dataUsageApiSlice.middleware)
        .concat(topUsageApiSlice.middleware)
        .concat(alertsApiSlice.middleware)
        .concat(iotOverviewApiSlice.middleware)
        .concat(reportsApiSlice.middleware)
    },
    preloadedState,
  })
  setupListeners(store.dispatch)
  return store
}

export const store = makeStore()

export type AppStore = typeof store
export type AppDispatch = AppStore['dispatch']
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>
