import * as React from "react";
import Stack from "@mui/material/Stack";
import MenuActionList from "./Menu";
import Page from "./Page";

export default function Home() {
  return (
    <Page title={`Home`}>
      <Stack
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        direction="row"
        spacing={30}
        display="flex"
        justifyContent="center"
      >
        <MenuActionList />
      </Stack>
    </Page>
  );
}
