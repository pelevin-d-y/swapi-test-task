import { swapiAxiosInstance } from '.'

export const client = {
  get: async <T>(url: string) => {
    try {
      const response = await swapiAxiosInstance.get<T>(url)
      return response.data
    } catch (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      throw new Error(error as any)
    }
  },
}
