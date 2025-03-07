import axios from 'axios'
import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const forms = [
  'jisho',
  'te',
  'nai',
  'ta',
  'kanou',
  'ikou',
  'ba',
  'ukemi',
  'shieki',
  'shiekiukemi',
  'meirei',
  'kinshi',
]

const baseUrl =
  'https://www.nihon5-sensei.com/api/v1/verbs/filter_for_flashcards'
const params = {
  textbook_id: '1',
  'lessons[]': [
    1, 10, 11, 13, 14, 15, 16, 17, 18, 4, 5, 6, 7, 9, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43,
    44, 45, 46, 47, 48, 49, 50,
  ],
  'verb_types[]': [1, 2, 3],
  front_verb_form: 'masu_form',
  required_card_amount: '5000',
  current_lesson: '',
}

async function fetchAndSaveForm(form: string) {
  try {
    const response = await axios.get(baseUrl, {
      params: {
        ...params,
        back_verb_form: `${form}_form`,
      },
    })

    const outputPath = path.join(__dirname, '..', 'data', `${form}-form.json`)
    await fs.mkdir(path.dirname(outputPath), { recursive: true })
    await fs.writeFile(outputPath, JSON.stringify(response.data, null, 2))
    console.log(`Saved ${form}-form.json`)
  } catch (error) {
    console.error(`Error fetching ${form} form:`, error)
  }
}

async function fetchAllForms() {
  for (const form of forms) {
    await fetchAndSaveForm(form)
    // Add a small delay between requests to be nice to the server
    await new Promise((resolve) => setTimeout(resolve, 1000))
  }
}

fetchAllForms()
