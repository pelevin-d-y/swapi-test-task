import { fetchPeople, selectPeople } from './peopleSlice'
import { PeopleSearch } from './PeopleSearch'

import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { Loader } from '../../components/Loader/Loader'
import { Card } from '../../components/Card/Card'
import { Pagination } from '../../components/Pagination/Pagination'

import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

export const People = () => {
  const dispatch = useAppDispatch()
  const { people, meta, status } = useAppSelector(selectPeople)

  const [searchParams] = useSearchParams()

  useEffect(() => {
    dispatch(
      fetchPeople({
        page: searchParams.get('page') || '1',
        searchParam: searchParams.get('search') || '',
      })
    )
  }, [searchParams, fetchPeople])

  const Cards = useMemo(() => {
    switch (true) {
      case status === 'loading' && !people.length:
        return <Loader />
      case status === 'succeeded' && !people.length:
        return <Typography textAlign="center">People not found</Typography>
      case status === 'failed':
        return (
          <Typography textAlign="center" color="red">
            Something went wrong
          </Typography>
        )
      default:
        return (
          <Grid container spacing={2} sx={{ mb: 5 }}>
            {people.map((person) => (
              <Grid key={person.name} item xs={12} sm={4} md={3}>
                <Card person={person} />
              </Grid>
            ))}
          </Grid>
        )
    }
  }, [status, people])

  return (
    <Box>
      <PeopleSearch sx={{ mb: 3 }} />

      {Cards}

      {meta?.count !== undefined && meta.count > 0 && (
        <Pagination
          disabled={status === 'loading'}
          count={Math.ceil(meta?.count / 10)}
        />
      )}
    </Box>
  )
}
