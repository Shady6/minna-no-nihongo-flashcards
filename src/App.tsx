import Deck from './Components/Deck'
import { DeckConfig } from './Components/DeckConfig'
import { Box } from '@mui/material'
import { useDeckConfig } from './contexts/DeckConfigContext'
import { Author } from './Components/Author'

function App() {
  const { isConfigDone } = useDeckConfig()

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
      className="App"
    >
      <Box sx={{ flex: 1, mt: 5 }}>
        {isConfigDone ? <Deck /> : <DeckConfig />}
      </Box>
      {!isConfigDone && <Author />}
    </Box>
  )
}

export default App
