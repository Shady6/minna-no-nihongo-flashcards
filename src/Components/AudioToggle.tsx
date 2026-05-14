import { IconButton, Tooltip, Box } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import { useSettings } from "../contexts/SettingsContext";

export function AudioToggle() {
  const { audioEnabled, setAudioEnabled } = useSettings();

  return (
    <Box sx={{ position: "absolute", top: -16, right: 56, zIndex: 1 }}>
      <Tooltip
        title={
          audioEnabled ? "Disable automatic audio" : "Enable automatic audio"
        }
        placement="left"
        arrow
      >
        <IconButton
          onClick={() => setAudioEnabled((v) => !v)}
          sx={{
            color: "text.secondary",
            "&:hover": {
              color: "primary.main",
              backgroundColor: "action.hover",
            },
          }}
          size="small"
        >
          {audioEnabled ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </IconButton>
      </Tooltip>
    </Box>
  );
}
