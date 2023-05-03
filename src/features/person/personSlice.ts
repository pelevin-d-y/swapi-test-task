import { client } from '../../api/client'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'

type PersonState = {
  person: Person | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string | null
}

const initialState: PersonState = {
  person: null,
  status: 'idle',
  error: null,
}

export const fetchPerson = createAsyncThunk(
  'person/fetchPerson',
  async (index: string) => {
    const response = await client.get<Person>(`/people/${index}`)

    return response
  }
)

export const personSlice = createSlice({
  name: 'person',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPerson.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPerson.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.person = action.payload
      })
      .addCase(fetchPerson.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectPerson = (state: RootState) => state.person
