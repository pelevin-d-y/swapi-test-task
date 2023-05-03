import { fetchPerson, selectPerson } from '../features/person/personSlice'
import { Loader } from '../components/Loader/Loader'
import { useAppDispatch, useAppSelector } from '../app/hooks'

import { Box, Link, Typography } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

type Row = {
  id: string
  property_name: string
  property_value: string | string[]
}

export const Person = () => {
  const { id } = useParams()
  const dispatch = useAppDispatch()
  const { person } = useAppSelector(selectPerson)

  useEffect(() => {
    dispatch(fetchPerson(id!))
  }, [id])

  const gridData = useMemo(() => {
    if (!person) return null

    const columns = [
      { field: 'property_name', headerName: 'Property name', width: 250 },
      {
        field: 'property_value',
        headerName: 'Property value',
        width: 300,
        editable: true,
      },
    ]

    const rows = Object.entries(person).reduce<Row[]>((acc, [key, value]) => {
      if (Array.isArray(value)) return acc

      const newValue =
        key === 'created' || key === 'edited'
          ? new Date(value).toLocaleString()
          : value

      return [...acc, { id: key, property_name: key, property_value: newValue }]
    }, [])

    return { columns, rows }
  }, [person])

  return (
    <Box>
      <Link href="/" fontSize={20}>
        Back
      </Link>
      {person ? (
        <>
          <Typography variant="h1" gutterBottom>
            {person?.name}
          </Typography>

          {gridData ? <DataGrid {...gridData} /> : null}
        </>
      ) : (
        <Loader />
      )}
    </Box>
  )
}
