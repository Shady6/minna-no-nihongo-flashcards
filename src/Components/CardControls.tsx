import { Box, Button } from '@mui/material'
import { useDeck } from '../contexts/DeckContext'
import { Close as WrongIcon, Check as CorrectIcon } from '@mui/icons-material'
import { useEffect } from 'react'

export const CardControls = () => {
  const { moveNext, addAnswer, flipped } = useDeck()

  const handleAnswer = (correct: boolean) => {
    addAnswer(correct)
    moveNext()
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (flipped && e.code === 'Enter') {
        e.preventDefault()
        handleAnswer(true)
      }
      if (flipped && e.code === 'Digit1') {
        e.preventDefault()
        handleAnswer(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [flipped])

  return flipped ? (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center', mt: 3 }}>
      <Button
        variant="contained"
        color="error"
        startIcon={<WrongIcon />}
        onClick={() => handleAnswer(false)}
        size="large"
        sx={{
          px: 4,
          bgcolor: 'error.light',
          '&:hover': {
            bgcolor: 'error.main',
          },
        }}
      >
        Wrong
      </Button>
      <Button
        variant="contained"
        color="success"
        startIcon={<CorrectIcon />}
        onClick={() => handleAnswer(true)}
        size="large"
        sx={{
          px: 4,
          bgcolor: 'success.light',
          '&:hover': {
            bgcolor: 'success.main',
          },
        }}
      >
        Correct
      </Button>
    </Box>
  ) : null
}
