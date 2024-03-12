import * as React from "react";
import Stack from "@mui/material/Stack";
import MenuActionList from "./Menu";

export default function Home() {
  return (
    <Stack
      direction="row"
      spacing={30}
      display={"flex"}
      justifyContent={"center"}
      p={20}
    >
      <MenuActionList />
    </Stack>
  );
}
