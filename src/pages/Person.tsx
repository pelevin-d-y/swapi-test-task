import { Box, Paper, Stack, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { fetchPerson, selectPerson } from '../features/person/personSlice'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { Loader } from '../components/Loader/Loader'

export const Person = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { person } = useAppSelector(selectPerson)

  useEffect(() => {
    dispatch(fetchPerson(id!))
  }, [id])

  const personItems = useMemo(() => {
    if (!person) return []
    return Object.entries(person).reduce<Array<string | string[]>[]>(
      (acc, [key, value]) => (acc = [...acc, [key, value]]),
      []
    )
  }, [person])

  return (
    <Box>
      {person ? (
        <>
          <Typography variant="h1" gutterBottom>
            {person?.name}
          </Typography>
          <Box>
            {person && (
              <Paper variant="outlined" elevation={4} sx={{ p: 2 }}>
                <Stack spacing={2} direction="column" alignItems="center">
                  {personItems.map(([key, value]) => (
                    <Stack width="100%" direction="row">
                      <Box sx={{ minWidth: 200 }}>{key}:</Box>
                      <Box>{value}</Box>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            )}
          </Box>
        </>
      ) : (
        <Loader />
      )}
    </Box>
  )
}
