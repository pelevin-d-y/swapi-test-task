import { Loader } from '../../components/Loader/Loader'
import { Card } from '../../components/Card/Card'

import { Box, Grid, Typography } from '@mui/material'

import s from './people.module.css'

type PeopleCardsProps = {
  people: Person[]
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
}

export const PeopleCards = ({ status, people }: PeopleCardsProps) => {
  const isLoading = status === 'loading'
  const isSucceeded = status === 'succeeded'
  const isFailed = status === 'failed'

  if (isLoading && !people.length) return <Loader />

  if (isSucceeded && !people.length) {
    return <Typography textAlign="center">People not found</Typography>
  }

  if (isFailed) {
    return (
      <Typography textAlign="center" color="red">
        Something went wrong
      </Typography>
    )
  }

  return (
    <Grid container spacing={2} sx={{ mb: 5, position: 'relative' }}>
      {people.map((person) => (
        <Grid key={person.name} item xs={12} sm={4} md={3}>
          <Card person={person} />
        </Grid>
      ))}
      {isLoading && (
        <Box className={s.loaderOverlay}>
          <Loader className={s.cardsLoader} />
        </Box>
      )}
    </Grid>
  )
}
