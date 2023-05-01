import axios from 'axios'

const baseSwapiUrl = 'https://swapi.dev/api/'

export const swapiAxiosInstance = axios.create({
  baseURL: baseSwapiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const client = {
  get: async <T,>(url: string) => {
    try {
      const response = await swapiAxiosInstance.get<T>(url)
      return response.data
    } catch (error) {
      throw new Error(error as any)
    }
  },
}
