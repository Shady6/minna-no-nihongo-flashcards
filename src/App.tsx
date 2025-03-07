import Deck from './Components/Deck'
import { DeckConfig } from './Components/DeckConfig'
import { Box } from '@mui/material'
import { useDeckConfig } from './contexts/DeckConfigContext'

function App() {
  const { isConfigDone } = useDeckConfig()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        mt: 5,
      }}
      className="App"
    >
      {isConfigDone ? <Deck /> : <DeckConfig />}
    </Box>
  )
}

export default App
