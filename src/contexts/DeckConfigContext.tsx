import { createContext, useContext, useState } from 'react'

const lessons_not_included = [2, 3, 8]
const available_forms = [
  'te_form',
  'nai_form',
  'ta_form',
  'potential_form',
  'volitional_form',
  'ba_form',
  'passive_form',
  'causative_form',
  'causative_passive_form',
  'imperative_form',
  'prohibitive_form',
]
const lessons_numbers = Array.from({ length: 50 }, (_, i) => i + 1).filter(
  (num) => !lessons_not_included.includes(num)
)

export type DeckConfigContextType = {
  lessons: Record<string, boolean>
  setLessonCheck: (lesson: string, checked: boolean) => void
  cardsAmount: number
  setCardsAmount: (amount: number) => void
  forms: Record<string, boolean>
  setFormCheck: (form: string, checked: boolean) => void
  isConfigDone: boolean
  setIsConfigDone: (done: boolean) => void
  deckConfig: DeckConfigType
  reset: () => void
}

export type DeckConfigType = {
  lessons: number[]
  cardsAmount: number
  forms: string[]
}

export const DeckConfigContext = createContext<DeckConfigContextType | null>(
  null
)

export const useDeckConfig = () => {
  const context = useContext(DeckConfigContext)
  if (!context) {
    throw new Error('useLessons must be used within a LessonsProvider')
  }
  return context
}

export const DeckConfigProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [cardsAmount, setCardsAmount] = useState(5)

  const [lessons, setLessons] = useState(
    lessons_numbers.reduce((acc, x) => ({ ...acc, [x]: false }), {})
  )
  const setLessonCheck = (lesson: string, checked: boolean) => {
    setLessons((prev) => ({ ...prev, [lesson]: checked }))
  }

  const [forms, setForms] = useState(
    available_forms.reduce((acc, x) => ({ ...acc, [x]: false }), {})
  )
  const setFormCheck = (form: string, checked: boolean) => {
    setForms((prev) => ({ ...prev, [form]: checked }))
  }

  const [isConfigDone, setIsConfigDone] = useState(false)

  const reset = () => {
    setIsConfigDone(false)
  }

  const deckConfig: DeckConfigType = {
    lessons: Object.entries(lessons)
      .filter(([_, checked]) => checked)
      .map(([lesson]) => Number(lesson)),
    cardsAmount,
    forms: Object.entries(forms)
      .filter(([_, checked]) => checked)
      .map(([form]) => form),
  }

  return (
    <DeckConfigContext.Provider
      value={{
        lessons,
        setLessonCheck,
        cardsAmount,
        setCardsAmount,
        forms,
        setFormCheck,
        deckConfig,
        isConfigDone,
        setIsConfigDone,
        reset,
      }}
    >
      {children}
    </DeckConfigContext.Provider>
  )
}
