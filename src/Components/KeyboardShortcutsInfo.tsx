import { IconButton, Tooltip, Box } from '@mui/material'
import InfoIcon from '@mui/icons-material/Info'
import { useEffect, useState } from 'react'

const keyboardShortcuts = [
  'Space - Flip card',
  'Enter - Mark as correct',
  '1 - Mark as incorrect',
]

export function KeyboardShortcutsInfo() {
  const [isTouchDevice, setIsTouchDevice] = useState(false)

  useEffect(() => {
    // Check if the device supports touch events
    setIsTouchDevice(
      'ontouchstart' in window ||
        navigator.maxTouchPoints > 0 ||
        // @ts-ignore
        navigator.msMaxTouchPoints > 0
    )
  }, [])

  if (isTouchDevice) {
    return null
  }

  return (
    <Box sx={{ position: 'absolute', top: -16, right: 16, zIndex: 1 }}>
      <Tooltip
        title={
          <Box component="div" sx={{ whiteSpace: 'pre-line' }}>
            {keyboardShortcuts.join('\n')}
          </Box>
        }
        placement="left"
        arrow
      >
        <IconButton
          sx={{
            color: 'text.secondary',
            '&:hover': {
              color: 'primary.main',
              backgroundColor: 'action.hover',
            },
          }}
          size="small"
        >
          <InfoIcon />
        </IconButton>
      </Tooltip>
    </Box>
  )
}
