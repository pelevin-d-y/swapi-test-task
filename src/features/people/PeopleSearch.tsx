import { TextField } from '@mui/material'
import { useSearchParams } from 'react-router-dom'

import type { SxProps, Theme } from '@mui/material'

type PeopleSearchProps = {
  sx?: SxProps<Theme> | undefined
}

export const PeopleSearch = ({ sx }: PeopleSearchProps) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <TextField
      sx={sx}
      label="Search"
      variant="outlined"
      defaultValue={searchParams.get('search') || ''}
      fullWidth
      onKeyPress={(e) => {
        if (e.key === 'Enter') {
          // eslint-disable-next-line @typescript-eslint/no-extra-semi
          ;(e.target as HTMLInputElement).blur()
        }
      }}
      onBlur={(e) => {
        if (e.target.value) {
          return setSearchParams({ search: e.target.value })
        }
        setSearchParams('')
      }}
    />
  )
}
