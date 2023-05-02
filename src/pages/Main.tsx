import { Typography } from '@mui/material'

import { People } from '../features/people/People'

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
