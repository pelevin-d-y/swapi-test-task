import { swapiAxiosInstance } from '.'

export const client = {
  get: async <T>(url: string) => {
    try {
      const response = await swapiAxiosInstance.get<T>(url)
      return response.data
    } catch (error) {
      throw new Error(error as any)
    }
  },
}
