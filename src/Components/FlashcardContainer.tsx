import { Box, IconButton, SxProps } from '@mui/material'
import { ArrowBack } from '@mui/icons-material'
import { useDeck } from '../contexts/DeckContext'
import { useDeckConfig } from '../contexts/DeckConfigContext'
import { Flashcard } from './Flashcard'
import { CardControls } from './CardControls'
import { FinishScreen } from './FinishScreen'

export const FlashcardContainer = () => {
  const { currentCard } = useDeck()
  const { reset: resetDeckConfig } = useDeckConfig()
  const { reset: resetDeck } = useDeck()

  const handleBack = () => {
    resetDeckConfig()
    resetDeck()
  }

  if (!currentCard) return null

  return (
    <Box sx={{ position: 'relative' }}>
      <IconButton onClick={handleBack} sx={iconStyle}>
        <ArrowBack />
      </IconButton>
      <Box
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Flashcard />
        <CardControls />
        <FinishScreen />
      </Box>
    </Box>
  )
}

const iconStyle = {
  position: 'absolute',
  left: 16,
  top: -16,
} as SxProps
