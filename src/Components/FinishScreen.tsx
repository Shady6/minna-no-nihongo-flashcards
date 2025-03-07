import { useDeckConfig } from '../contexts/DeckConfigContext'
import { useDeck } from '../contexts/DeckContext'
import { Backdrop, Button, Paper, Typography } from '@mui/material'
import { ReactNode } from 'react'

export const FinishScreen = () => {
  const { isFinished, flashcards } = useDeck()
  const allCorrect = flashcards.every((x) => x.correct)

  if (isFinished && allCorrect) return <SuccessScreen />
  if (isFinished && !allCorrect) return <RepeatScreen />
  return null
}

const useReset = () => {
  const { reset: resetDeck } = useDeck()
  const { reset: resetDeckConfig } = useDeckConfig()

  return () => {
    resetDeckConfig()
    resetDeck()
  }
}

const ModalWrapper = ({ children }: { children: ReactNode }) => (
  <Backdrop
    sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
    open={true}
  >
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2,
        px: 10,
        py: 5,
      }}
    >
      {children}
    </Paper>
  </Backdrop>
)

export const RepeatScreen = () => {
  const goBackHome = useReset()
  const { repeatMistakes } = useDeck()

  return (
    <ModalWrapper>
      <Typography>Try again the verbs you failed?</Typography>
      <Button onClick={repeatMistakes}>Yes</Button>
      <Button onClick={goBackHome}>No</Button>
    </ModalWrapper>
  )
}

export const SuccessScreen = () => {
  const goBackHome = useReset()

  return (
    <ModalWrapper>
      <Typography>Congratulations you finished!</Typography>
      <Button onClick={goBackHome}>Back to home</Button>
    </ModalWrapper>
  )
}
