import { Paper, Typography, Box } from "@mui/material";
import { flashcardStyles } from "./Flashcard.styles";
import { FlashcardType, useDeck } from "../contexts/DeckContext";
import { useSettings } from "../contexts/SettingsContext";
import { useCallback, useEffect, useRef, useState } from "react";
import { displayForm } from "./DeckConfig";
import { CardBackside } from "./CardBackside";

const CardFrontside = ({ kanji, kana }: { kanji?: string; kana?: string }) => (
  <Box sx={flashcardStyles.cardSide}>
    <Typography variant="h3" sx={{ fontWeight: "bold" }}>
      {kanji}
    </Typography>
    <Typography variant="h6" sx={{ color: "text.secondary" }}>
      {kana}
    </Typography>
  </Box>
);

const useFlipOnSpace = (onFlip: () => void) => {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        onFlip();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [onFlip]);
};

const useCardAudio = (card: FlashcardType | null) => {
  const { audioEnabled } = useSettings();
  const [soundPlayed, setSoundPlayed] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!card) return;
    setSoundPlayed(false);
    const audio = new Audio(
      `${process.env.PUBLIC_URL}/sounds/${card.audio_id}.wav`,
    );
    audio.preload = "auto";
    audioRef.current = audio;
  }, [card]);

  const playOnce = useCallback(() => {
    if (!audioEnabled || soundPlayed) return;
    audioRef.current?.play();
    setSoundPlayed(true);
  }, [audioEnabled, soundPlayed]);

  const replay = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = 0;
    audio.play();
  }, []);

  return { playOnce, replay };
};

export const Flashcard = () => {
  const {
    currentCard: card,
    flipped,
    setFlipped,
    flashcards,
    currentIndex,
  } = useDeck();

  const [transitionEnabled, setTransitionEnabled] = useState(false);

  const { playOnce, replay } = useCardAudio(card);

  const flip = useCallback(() => {
    setFlipped((f) => !f);
    setTransitionEnabled(true);
    playOnce();
  }, [setFlipped, playOnce]);

  useFlipOnSpace(flip);

  useEffect(() => {
    setTransitionEnabled(false);
  }, [card]);

  if (!card) return null;

  return (
    <Box>
      <Typography sx={{ textAlign: "center", mb: 2 }}>
        {currentIndex + 1} / {flashcards.length}
      </Typography>
      <Paper
        onClick={flip}
        sx={{
          ...flashcardStyles.container,
          transition: transitionEnabled ? "transform 0.6s" : "none",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0)",
        }}
      >
        <CardFrontside kanji={card?.frontKanji} kana={card?.frontKana} />
        <CardBackside
          kanji={card?.backKanji}
          kana={card?.backKana}
          translation={card?.translation}
          onReplay={replay}
        />
      </Paper>
      {!flipped && (
        <Typography variant="h5" sx={{ textAlign: "center", mt: 4 }}>
          What is {displayForm(card.form)}-form?
        </Typography>
      )}
    </Box>
  );
};
