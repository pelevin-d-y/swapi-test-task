import { fetchPeople, selectPeople } from './peopleSlice'
import { PeopleSearch } from './PeopleSearch'
import { PeopleCards } from './PeopleCards'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Pagination } from '../../components/Pagination/Pagination'

import { Box } from '@mui/material'
import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const CARDS_PER_PAGE = 10

export const People = () => {
  const dispatch = useAppDispatch()
  const { people, meta, status } = useAppSelector(selectPeople)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    // function is called twice on page load only in dev mode.
    dispatch(
      fetchPeople({
        page: searchParams.get('page') || '1',
        searchParam: searchParams.get('search') || '',
      })
    )
  }, [searchParams, fetchPeople])

  return (
    <Box>
      <Box sx={{ mb: 3 }}>
        <PeopleSearch />
      </Box>

      <PeopleCards people={people} status={status} />

      {meta?.count !== undefined && meta.count > 0 && (
        <Pagination
          disabled={status === 'loading'}
          count={Math.ceil(meta?.count / CARDS_PER_PAGE)}
        />
      )}
    </Box>
  )
}
