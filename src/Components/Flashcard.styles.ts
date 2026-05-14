import { SxProps, Theme } from "@mui/material";

const cardSide = {
  position: "absolute",
  backfaceVisibility: "hidden",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  p: { xs: 2, sm: 3, md: 4 },
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 1,
} as SxProps<Theme>;

export const flashcardStyles = {
  container: {
    width: {
      xs: "80vw", // On mobile, take 90% of viewport width
      sm: "400px", // Tablet
      md: "700px", // Desktop
    },
    height: "65vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    transition: "transform 0.6s, box-shadow 0.1s ease-in-out",
    transformStyle: "preserve-3d",
    position: "relative",
    backgroundColor: "white",
    borderRadius: 5,
    boxShadow: "0 4px 8px 0 rgba(0, 0, 0, 0.2)",
    "&:hover": {
      boxShadow: 6,
    },
  } as SxProps<Theme>,

  cardSide: cardSide,

  backSide: {
    ...cardSide,
    transform: "rotateY(180deg)",
  } as SxProps<Theme>,
};
