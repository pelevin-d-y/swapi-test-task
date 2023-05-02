import { Pagination as MuiPagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

type PaginationProps = {
  disabled: boolean
  count: number
}

export const Pagination = ({ disabled, count }: PaginationProps) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1'))

  useEffect(() => {
    setPage(parseInt(searchParams.get('page') || '1'))
  }, [searchParams])

  return (
    <MuiPagination
      disabled={disabled}
      count={count}
      page={page}
      siblingCount={0}
      variant="outlined"
      shape="rounded"
      sx={{
        display: 'flex',
        justifyContent: 'center',
      }}
      onChange={(_, page) => {
        const params: Record<string, string> = {}
        searchParams.forEach((value, key) => {
          params[key] = value
        })

        setSearchParams({ ...params, page: page.toString() })
      }}
    />
  )
}
