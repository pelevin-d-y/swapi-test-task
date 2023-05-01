import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import { peopleSlice } from '../features/people/peopleSlice'
import { personSlice } from '../features/person/personSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
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
