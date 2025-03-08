import {
  Box,
  IconButton,
  Tooltip,
  Typography,
  Stack,
  Link,
} from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub'
import YouTubeIcon from '@mui/icons-material/YouTube'
import TwitterIcon from '@mui/icons-material/Twitter'

export const Author = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 2,
        backgroundColor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 2,
      }}
    >
      <Stack alignItems="center">
        <Typography variant="body2" color="text.secondary">
          Made by Mikolaj Piekutowski
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Contact: mikolaj.mikolaj@gmail.com
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Inspired by{' '}
          <Link
            href="https://nihon5-sensei.com/wordform_flashcards"
            target="_blank"
          >
            nihon5-sensei.com
          </Link>
        </Typography>
        <Box sx={{ mt: 1 }}>
          <Tooltip title="View source code on GitHub">
            <IconButton
              component="a"
              href="https://github.com/Shady6/minna-no-nihongo-flashcards"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
                mr: 1,
              }}
              size="small"
            >
              <GitHubIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Follow me on Twitter">
            <IconButton
              component="a"
              href="https://x.com/mikopukpuk"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
                mr: 1,
              }}
              size="small"
            >
              <TwitterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Checkout my YouTube Channel">
            <IconButton
              component="a"
              href="https://www.youtube.com/@miko-puk-puk/featured"
              target="_blank"
              rel="noopener noreferrer"
              sx={{
                color: 'text.secondary',
                '&:hover': {
                  color: 'primary.main',
                },
              }}
              size="small"
            >
              <YouTubeIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Stack>
    </Box>
  )
}
