import { FC, PropsWithChildren } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { theme } from "./theme";

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  return (
    <MUIThemeProvider theme={theme}>
      <CssBaseline />

      {children}
    </MUIThemeProvider>
  );
};
