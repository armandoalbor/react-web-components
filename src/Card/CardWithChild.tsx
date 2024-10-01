import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardActionArea from "@mui/material/CardActionArea";
import { FC, PropsWithChildren } from "react";
import { Typography } from "@mui/material";

export const CardWithChild: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <Typography>CardWithChild</Typography>
        <CardContent>{children}</CardContent>
      </CardActionArea>
    </Card>
  );
};
