import { FlashcardType, useDeck } from '../contexts/DeckContext'
import { useEffect } from 'react'
import { FlashcardContainer } from './FlashcardContainer'
import { DeckConfigType, useDeckConfig } from '../contexts/DeckConfigContext'
import { Stack } from '@mui/material'
import { KeyboardShortcutsInfo } from './KeyboardShortcutsInfo'
import { Author } from './Author'

// Import all form data
import teFormData from '../data/te_form.json'
import naiFormData from '../data/nai_form.json'
import taFormData from '../data/ta_form.json'
import baFormData from '../data/ba_form.json'
import potentialFormData from '../data/potential_form.json'
import volitionalFormData from '../data/volitional_form.json'
import passiveFormData from '../data/passive_form.json'
import causativeFormData from '../data/causative_form.json'
import causativePassiveFormData from '../data/causative passive_form.json'
import imperativeFormData from '../data/imperative_form.json'
import prohibitiveFormData from '../data/prohibitive_form.json'

const formFileMap = {
  te_form: teFormData,
  nai_form: naiFormData,
  ta_form: taFormData,
  ba_form: baFormData,
  potential_form: potentialFormData,
  volitional_form: volitionalFormData,
  passive_form: passiveFormData,
  causative_form: causativeFormData,
  causative_passive_form: causativePassiveFormData,
  imperative_form: imperativeFormData,
  prohibitive_form: prohibitiveFormData,
} as const

export const loadData = (deckConfig: DeckConfigType) => {
  let out: FlashcardType[] = []

  deckConfig.forms.forEach((form) => {
    const formData = formFileMap[form as keyof typeof formFileMap]
    formData.forEach((item) => {
      if (deckConfig.lessons.includes(Number(item.lesson))) {
        out.push({
          frontKana: item.masu_form,
          frontKanji: item.masu_form_kanji ?? item.masu_form,
          // @ts-ignore
          backKana: item[form] as string,
          // @ts-ignore
          backKanji: item[`${form}kanji`] ?? (item[form] as string),
          lesson: Number(item.lesson),
          form: form,
        })
      }
    })
  })

  // randomize order of out
  out = out.sort(() => Math.random() - 0.5)
  // take only deckConfig.cardsAmount
  out = out.slice(0, deckConfig.cardsAmount)

  return out
}

export default function Deck() {
  const { deckConfig } = useDeckConfig()
  const { setFlashcards } = useDeck()

  useEffect(() => {
    setFlashcards(loadData(deckConfig))
  }, [deckConfig, setFlashcards])

  return (
    <Stack sx={{ width: '100%', height: '100%', position: 'relative' }}>
      <KeyboardShortcutsInfo />
      <FlashcardContainer />
      <Author />
    </Stack>
  )
}
