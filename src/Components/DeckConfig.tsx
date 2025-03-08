import {
  Checkbox,
  FormControlLabel,
  FormGroup,
  Typography,
  Box,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  Button,
} from '@mui/material'
import { useDeckConfig } from '../contexts/DeckConfigContext'

export const DeckConfig = () => {
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom>
        Deck Configuration
      </Typography>
      <CardAmount />
      <LessonChecks />
      <FormChecks />
      <DoneButton />
    </Box>
  )
}

const CardAmount = () => {
  const { cardsAmount, setCardsAmount } = useDeckConfig()
  const amounts = Array.from({ length: 10 }, (_, i) => (i + 1) * 5)

  return (
    <FormControl component="fieldset" sx={{ mb: 3 }}>
      <FormLabel component="legend">Number of cards per lesson</FormLabel>
      <RadioGroup
        row
        value={cardsAmount}
        onChange={(e) => setCardsAmount(Number(e.target.value))}
      >
        {amounts.map((amount) => (
          <FormControlLabel
            key={amount}
            value={amount}
            control={<Radio />}
            label={amount.toString()}
          />
        ))}
      </RadioGroup>
    </FormControl>
  )
}

const LessonChecks = () => {
  return (
    <FormControl sx={{ mb: 3 }}>
      <FormLabel component="legend">Lessons</FormLabel>
      <FormGroup
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
      >
        {Object.entries(useDeckConfig().lessons).map(([number, checked]) => (
          <LessonCheck key={number} lesson={number} />
        ))}
      </FormGroup>
    </FormControl>
  )
}

const LessonCheck = ({ lesson }: { lesson: string }) => {
  const { lessons, setLessonCheck } = useDeckConfig()

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={lessons[lesson]}
          onChange={(e) => setLessonCheck(lesson, e.target.checked)}
          color="primary"
        />
      }
      label={lesson}
    />
  )
}

const FormChecks = () => {
  return (
    <FormControl sx={{ mb: 3 }}>
      <FormLabel component="legend">Forms</FormLabel>
      <FormGroup
        sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 1 }}
      >
        {Object.entries(useDeckConfig().forms).map(([form, checked]) => (
          <FormCheck key={form} form={form} />
        ))}
      </FormGroup>
    </FormControl>
  )
}

const FormCheck = ({ form }: { form: string }) => {
  const { forms, setFormCheck } = useDeckConfig()

  return (
    <FormControlLabel
      control={
        <Checkbox
          checked={forms[form]}
          onChange={(e) => setFormCheck(form, e.target.checked)}
          color="primary"
        />
      }
      label={displayForm(form)}
    />
  )
}

const DoneButton = () => {
  const { setIsConfigDone, lessons, forms } = useDeckConfig()
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <Button
        disabled={
          Object.values(lessons).every((x) => !x) ||
          Object.values(forms).every((x) => !x)
        }
        variant="contained"
        size="large"
        onClick={() => setIsConfigDone(true)}
        sx={{ mt: 2, minWidth: '120px' }}
      >
        Done
      </Button>
    </Box>
  )
}

export const displayForm = (form: string) => {
  return form.replace('_form', '').replace('_', ' ')
}
