import * as React from "react";
import Paper from "@mui/material/Paper";
import MenuList from "@mui/material/MenuList";
import Stack from "@mui/material/Stack";
import MenuActionList from "./Menu";
import Userdata from "./UserData";

export default function Home() {
  return (
    <Stack
      direction="row"
      spacing={30}
      display={"flex"}
      justifyContent={"center"}
      p={20}
    >
      <Paper>
        <MenuList>
          <MenuActionList />
        </MenuList>
      </Paper>
      <Paper>
        <Userdata />
      </Paper>
    </Stack>
  );
}
