import { fetchPeople, peopleSlice } from './peopleSlice'

import { swapiAxiosInstance } from '../../api'

import { waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { configureStore } from '@reduxjs/toolkit'

// mock client.get
const mockClientGet = vi.fn()

vi.mock('../../api/client', () => ({
  client: {
    get: (url: string) => mockClientGet(url),
  },
}))

describe('fetchPeople', () => {
  afterEach(() => {
    vi.clearAllMocks()
  })

  test('should call client.get with correct url', async () => {
    const store = configureStore({ reducer: { people: peopleSlice.reducer } })
    const page = '1'
    const searchParam = 'Skywalker'
    const url = `${swapiAxiosInstance.defaults.baseURL}/people/?page=${page}&search=${searchParam}`

    mockClientGet.mockResolvedValueOnce({
      data: {
        results: [],
        count: 0,
        next: null,
        previous: null,
      },
    })

    store.dispatch(fetchPeople({ page, searchParam }))
    await waitFor(() => {
      expect(mockClientGet).toHaveBeenCalledWith(url)
    })
  })

  test('should update state correctly on fulfilled', async () => {
    const store = configureStore({ reducer: { people: peopleSlice.reducer } })
    const mockPayload = {
      results: [
        { name: 'Luke Skywalker', height: '172' },
        { name: 'Leia Organa', height: '150' },
      ],
      count: 3,
      next: null,
      previous: null,
    }
    mockClientGet.mockResolvedValueOnce(mockPayload)
    await store.dispatch(fetchPeople({ page: '1', searchParam: 'Skywalker' }))
    await waitFor(() => {
      const state = store.getState().people

      expect(state.status).toBe('succeeded')
      expect(state.people).toEqual(mockPayload.results)
      expect(state.meta?.count).toBe(mockPayload.count)
      expect(state.meta?.next).toBe(mockPayload.next)
      expect(state.meta?.previous).toBe(mockPayload.previous)
      expect(state.error).toBe(null)
    })
  })

  test('should update state correctly on rejected', async () => {
    const store = configureStore({ reducer: { people: peopleSlice.reducer } })
    const error = new Error('Network Error')
    mockClientGet.mockRejectedValueOnce(error)
    await store.dispatch(fetchPeople({ page: '1', searchParam: 'Skywalker' }))
    const state = store.getState().people
    expect(state.status).toBe('failed')
    expect(state.people).toEqual([])
    expect(state.meta).toEqual(null)
    expect(state.error).toBe(error.message)
  })
})
