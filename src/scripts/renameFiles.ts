import fs from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const mapping = {
  jisho_form: 'dictionary_form',
  kanou_form: 'potential_form',
  ikou_form: 'volitional_form',
  ukemi_form: 'passive_form',
  shieki_form: 'causative_form',
  shiekiukemi_form: 'causative_passive_form',
  meirei_form: 'imperative_form',
  kinshi_form: 'prohibitive_form',
}

// Create reverse mapping for form names in the JSON content
const contentMapping = Object.fromEntries(
  Object.entries(mapping).map(([oldName, newName]) => [
    oldName.replace('-', '_'),
    newName.replace(/ /g, '_'),
  ])
)

async function updateFileContent(filePath: string) {
  const content = await fs.readFile(filePath, 'utf-8')
  const data = JSON.parse(content)

  // Update each verb's form names
  data.forEach((verb: any) => {
    Object.entries(mapping).forEach(([oldForm, newForm]) => {
      if (verb[oldForm] !== undefined) {
        verb[newForm] = verb[oldForm]
        delete verb[oldForm]
      }
      if (verb[`${oldForm}_kanji`] !== undefined) {
        verb[`${newForm}_kanji`] = verb[`${oldForm}_kanji`]
        delete verb[`${oldForm}_kanji`]
      }
    })
  })

  await fs.writeFile(filePath, JSON.stringify(data, null, 2))
  console.log(`Updated content in ${path.basename(filePath)}`)
}

async function updateFiles() {
  const dataDir = path.join(__dirname, '..', 'data')
  const files = await fs.readdir(dataDir)

  for (const file of files) {
    if (file.endsWith('.json')) {
      try {
        const filePath = path.join(dataDir, file)
        await updateFileContent(filePath)
      } catch (error) {
        console.error(`Error processing ${file}:`, error)
      }
    }
  }
}

updateFiles()
