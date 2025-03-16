import { Paper, Typography, Box } from '@mui/material'
import { flashcardStyles } from './Flashcard.styles'
import { useDeck } from '../contexts/DeckContext'
import { useEffect, useState } from 'react'
import { displayForm } from './DeckConfig'
import { CardBackside } from './CardBackside'

export const Flashcard = () => {
  const {
    currentCard: card,
    flipped,
    setFlipped,
    flashcards,
    currentIndex,
  } = useDeck()

  const [transitionEnabled, setTransitionEnabled] = useState(false)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        e.preventDefault()
        setFlipped(!flipped)
        setTransitionEnabled(true)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [flipped, setFlipped])

  useEffect(() => {
    setTransitionEnabled(false)
  }, [card])

  const CardContent = ({ kanji, kana }: { kanji?: string; kana?: string }) => (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Typography variant="h3" sx={{ fontWeight: 'bold' }}>
        {kanji}
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.secondary' }}>
        {kana}
      </Typography>
    </Box>
  )

  if (!card) return null

  return (
    <Box>
      <Typography sx={{ textAlign: 'center', mb: 2 }}>
        {currentIndex + 1} / {flashcards.length}
      </Typography>
      <Paper
        onClick={() => {
          setFlipped(!flipped)
          setTransitionEnabled(true)
        }}
        sx={{
          ...flashcardStyles.container,
          transition: transitionEnabled ? 'transform 0.6s' : 'none',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
        }}
      >
        <Box sx={flashcardStyles.cardSide}>
          <CardContent kanji={card?.frontKanji} kana={card?.frontKana} />
        </Box>
        <Box
          sx={Object.assign(
            {},
            flashcardStyles.cardSide,
            flashcardStyles.backSide
          )}
        >
          <CardBackside
            kanji={card?.backKanji}
            kana={card?.backKana}
            translation={card?.translation}
          />
        </Box>
      </Paper>
      {!flipped && (
        <Typography variant="h5" sx={{ textAlign: 'center', mt: 4 }}>
          What is {displayForm(card.form)}-form?
        </Typography>
      )}
    </Box>
  )
}
