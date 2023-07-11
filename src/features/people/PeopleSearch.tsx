import { Button, Stack, TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'
import { useCallback, useState } from 'react'

export const PeopleSearch = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(searchParams.get('search') || '')

  const handleSearch = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (search) {
        return setSearchParams({ search })
      }
      setSearchParams('')
    },
    [search, setSearchParams]
  )

  return (
    <form onSubmit={handleSearch}>
      <Stack direction="row" spacing={2}>
        <TextField
          label="Search"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Button type="submit">Search</Button>
      </Stack>
    </form>
  )
}
