import { Typography } from "@mui/material";
import { CSSProperties } from "react";

const HintBox = ({
  message,
  type,
  style,
}: {
  message: string;
  type: "info" | "error" | "warning";
  style?: CSSProperties
}) => {
  return (
    <Typography color={type} variant="body2" style={style}>
      <span dangerouslySetInnerHTML={{ __html: message as string }} />
    </Typography>
  );
};

export { HintBox }
