import { Box, Typography } from '@mui/material'

interface CardBacksideProps {
  kanji?: string
  kana?: string
  translation?: string
}

export const CardBackside = ({
  kanji,
  kana,
  translation,
}: CardBacksideProps) => (
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
    {translation && (
      <Typography variant="h6" sx={{ color: 'text.secondary', mt: 2 }}>
        {translation}
      </Typography>
    )}
  </Box>
)
