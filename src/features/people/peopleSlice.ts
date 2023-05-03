import { swapiAxiosInstance } from '../../api'
import { client } from '../../api/client'

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../../app/store'

type PeopleState = {
  people: Person[]
  meta: {
    count: number
    next: string | null
    previous: string | null
  } | null
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error?: string | null
}

const initialState: PeopleState = {
  people: [],
  meta: null,
  status: 'idle',
  error: null,
}

export const fetchPeople = createAsyncThunk(
  'people/fetchPeople',
  async ({ page, searchParam }: { page: string; searchParam?: string }) => {
    const url = new URL(swapiAxiosInstance.defaults.baseURL + '/people/')

    url.searchParams.append('page', page.toString())
    if (searchParam) url.searchParams.append('search', searchParam)

    const response = await client.get<PaginatedResponse<Person[]>>(
      url.toString()
    )
    return response
  }
)

export const peopleSlice = createSlice({
  name: 'people',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPeople.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPeople.fulfilled, (state, action) => {
        const { results, count, next, previous } = action.payload

        state.status = 'succeeded'
        state.people = results
        state.meta = {
          count,
          next,
          previous,
        }
      })
      .addCase(fetchPeople.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  },
})

export const selectPeople = (state: RootState) => state.people
