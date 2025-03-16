import { createContext, useContext, useState, ReactNode } from 'react'

export type FlashcardType = {
  lesson: number
  form: string
  frontKanji?: string
  frontKana?: string
  backKanji?: string
  backKana?: string
  translation: string
}

export type SessionFlashcardType = FlashcardType & {
  correct: boolean
}

type DeckContextType = {
  flashcards: SessionFlashcardType[]
  setFlashcards: (cards: FlashcardType[]) => void
  currentIndex: number
  setCurrentIndex: (index: number) => void
  currentCard: FlashcardType | null
  moveNext: () => void
  flipped: boolean
  setFlipped: (flipped: boolean) => void
  addAnswer: (correct: boolean) => void
  isFinished: boolean
  repeatMistakes: () => void
  reset: () => void
}

export const DeckContext = createContext<DeckContextType | null>(null)

export const useDeck = () => {
  const context = useContext(DeckContext)
  if (!context) {
    throw new Error('useDeck must be used within a DeckProvider')
  }
  return context
}

export const DeckProvider = ({ children }: { children: ReactNode }) => {
  const [flashcards, setFlashcards] = useState<FlashcardType[]>([])
  const [sessionFlashcards, setSessionFlashcards] = useState<
    SessionFlashcardType[]
  >([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [flipped, setFlipped] = useState(false)
  const currentCard =
    sessionFlashcards.length > 0 ? sessionFlashcards[currentIndex] : null
  const [isFinished, setIsFinished] = useState(false)

  const handleSetFlashcards = (cards: FlashcardType[]) => {
    setFlashcards(cards)
    setSessionFlashcards(cards.map((card) => ({ ...card, correct: false })))
  }

  const moveNext = () => {
    setFlipped(false)
    if (currentIndex < sessionFlashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setIsFinished(true)
    }
  }

  const addAnswer = (correct: boolean) => {
    setSessionFlashcards((prev) => {
      const newFlashcards = [...prev]
      newFlashcards[currentIndex].correct = correct
      return newFlashcards
    })
  }

  const reset = () => {
    setCurrentIndex(0)
    setIsFinished(false)
    setSessionFlashcards([])
    setFlashcards([])
  }

  const repeatMistakes = () => {
    setCurrentIndex(0)
    setIsFinished(false)
    setSessionFlashcards((prev) => {
      const newFlashcards = prev.filter((x) => !x.correct)
      return newFlashcards
    })
  }

  return (
    <DeckContext.Provider
      value={{
        flashcards: sessionFlashcards,
        setFlashcards: handleSetFlashcards,
        currentIndex,
        setCurrentIndex,
        currentCard,
        moveNext,
        flipped,
        setFlipped,
        addAnswer,
        isFinished,
        repeatMistakes,
        reset,
      }}
    >
      {children}
    </DeckContext.Provider>
  )
}
