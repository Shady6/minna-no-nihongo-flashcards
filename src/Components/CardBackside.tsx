import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { flashcardStyles } from "./Flashcard.styles";

interface CardBacksideProps {
  kanji?: string;
  kana?: string;
  translation?: string;
  onReplay?: () => void;
}

export const CardBackside = ({
  kanji,
  kana,
  translation,
  onReplay,
}: CardBacksideProps) => (
  <Box sx={flashcardStyles.backSide}>
    <Replay onReplay={onReplay} />
    <Typography variant="h3" sx={{ fontWeight: "bold" }}>
      {kanji}
    </Typography>
    <Typography variant="h6" sx={{ color: "text.secondary" }}>
      {kana}
    </Typography>
    {translation && (
      <Typography variant="h6" sx={{ color: "text.secondary", mt: 2 }}>
        {translation}
      </Typography>
    )}
  </Box>
);

const Replay = ({ onReplay }: any) => {
  return (
    onReplay && (
      <Tooltip title="Replay audio" placement="left" arrow>
        <IconButton
          onMouseDown={(e) => e.preventDefault()}
          onClick={(e) => {
            e.stopPropagation();
            e.currentTarget.blur();
            onReplay();
          }}
          sx={{
            position: "absolute",
            top: 64,
            right: 64,
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
          size="small"
        >
          <VolumeUpIcon />
        </IconButton>
      </Tooltip>
    )
  );
};
