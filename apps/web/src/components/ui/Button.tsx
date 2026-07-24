import MuiButton from "@mui/material/Button";
import type { ButtonProps } from "@mui/material/Button";

export default function Button({
  variant = "contained",
  ...props
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      {...props}
    />
  );
}