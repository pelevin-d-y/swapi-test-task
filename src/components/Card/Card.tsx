import { routes } from '../../app/routes'

import {
  CardActions,
  CardContent,
  Link,
  Card as MuiCard,
  Typography,
} from '@mui/material'

type CardType = {
  person: Person
}

const getPersonId = (url: string) => {
  const urlParts = url.split('/')
  return urlParts[urlParts.length - 2]
}

export const Card = ({ person }: CardType) => {
  return (
    <MuiCard sx={{ height: '100%' }}>
      <CardContent>
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {person.name}
        </Typography>
        <Typography>Birth year: {person.birth_year}</Typography>
        <Typography>Eye color: {person.eye_color}</Typography>
        <Typography>Gender: {person.gender}</Typography>
      </CardContent>
      <CardActions sx={{ marginTop: 'auto' }}>
        <Link
          href={routes.PERSON.replace(':id', getPersonId(person.url))}
          underline="none"
          sx={{ padding: 1 }}
        >
          Learn More
        </Link>
      </CardActions>
    </MuiCard>
  )
}
