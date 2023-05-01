import { useEffect } from 'react'
import { Grid, Pagination, Typography } from '@mui/material'
import { Counter } from '../features/counter/Counter'
import { fetchPeople, selectPeople } from '../features/people/peopleSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Card } from '../components/Card/Card'
import { Loader } from '../components/Loader/Loader'

function App() {
  const dispatch = useAppDispatch()
  const { people, meta, status } = useAppSelector(selectPeople)

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPeople(1))
    }
  }, [status, dispatch])

  return (
    <>
      <Counter />
      <Typography variant="h1" gutterBottom>
        Star Wars People
      </Typography>
      {people.length ? (
        <Grid container spacing={2} sx={{ marginBottom: 5 }}>
          {people.map((person) => (
            <Grid key={person.name} item xs={6} md={3} sm={4}>
              <Card person={person} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Loader />
      )}

      {meta?.count && (
        <Pagination
          disabled={status === 'loading'}
          count={Math.ceil(meta?.count / 10)}
          variant="outlined"
          shape="rounded"
          size="large"
          sx={{
            display: 'flex',
            justifyContent: 'center',
          }}
          onChange={(_, page) => {
            dispatch(fetchPeople(page))
          }}
        />
      )}
    </>
  )
}

export default App
