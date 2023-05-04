import { peopleSlice } from '../features/people/peopleSlice'
import { personSlice } from '../features/person/personSlice'

import { configureStore } from '@reduxjs/toolkit'

import type { ThunkAction, Action } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    people: peopleSlice.reducer,
    person: personSlice.reducer,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
