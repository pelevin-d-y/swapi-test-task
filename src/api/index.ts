import axios from 'axios'

const baseSwapiUrl = 'https://swapi.dev/api'

export const swapiAxiosInstance = axios.create({
  baseURL: baseSwapiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
})
