import { People } from '../features/people/People'

import { Typography } from '@mui/material'

function App() {
  return (
    <>
      <Typography variant="h1" gutterBottom>
        Star Wars People
      </Typography>
      <People />
    </>
  )
}

export default App
