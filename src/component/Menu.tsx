import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ArrowRight from "@mui/icons-material/ArrowRight";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import Home from "@mui/icons-material/Home";
import Settings from "@mui/icons-material/Settings";
import { GetApp, Search } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Userdata from "./UserData";
import Typography from "@mui/material/Typography";

const data = [
  { icon: <GetApp />, label: "Get All User(s)" },
  { icon: <Search />, label: "Search User(s)" },
];

export default function MenuActionList() {
  const navigate = useNavigate();
  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  const [open, setOpen] = React.useState(true);

  return (
    <Box
      sx={{
        border: "1px solid black",
        display: "flex",
        justifyContent: "space-between",
        maxWidth: "100%",
      }}
    >
      <Paper elevation={2} sx={{ maxWidth: 200, padding: 1 }}>
        <Divider />
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <Home color="primary" />
            </ListItemIcon>
            <ListItemText
              primary="React App"
              primaryTypographyProps={{
                color: "primary",
                fontWeight: "medium",
                variant: "body2",
              }}
            />
          </ListItemButton>
        </ListItem>
        <Divider />
        <Box
          sx={{
            bgcolor: "black",
            pb: open ? 2 : 0,
          }}
        >
          <ListItemButton
            alignItems="flex-start"
            onClick={() => setOpen(!open)}
            sx={{
              px: 3,
              pt: 2.5,
              pb: open ? 0 : 2.5,
              "&:hover, &:focus": { "& svg": { opacity: open ? 1 : 0 } },
            }}
          >
            <ListItemText
              primary="Action"
              primaryTypographyProps={{
                fontSize: 15,
                color: "white",
                fontWeight: "medium",
                lineHeight: "20px",
                mb: "2px",
              }}
              secondary="Authentication, Firestore Database, Realtime Database, Storage, Hosting, Functions, and Machine Learning"
              secondaryTypographyProps={{
                noWrap: true,
                fontSize: 12,
                lineHeight: "16px",
                color: open ? "rgba(0,0,0,0)" : "rgba(255,255,255,0.5)",
              }}
              sx={{ my: 0 }}
            />
            <KeyboardArrowDown
              sx={{
                mr: -1,
                opacity: 0,
                transform: open ? "rotate(-180deg)" : "rotate(0)",
                transition: "0.2s",
              }}
            />
          </ListItemButton>
          {open &&
            data.map((item) => (
              <ListItemButton
                key={item.label}
                sx={{ py: 0, minHeight: 32, color: "rgba(255,255,255,.8)" }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    fontSize: 14,
                    fontWeight: "medium",
                  }}
                />
              </ListItemButton>
            ))}
          <Stack p={2}>
            <Button onClick={handleLogOut} color="primary" variant="contained">
              LogOut
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ maxWidth: "100%", padding: 1 }}>
        <Userdata />
      </Paper>
    </Box>
  );
}
