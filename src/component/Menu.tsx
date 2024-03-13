import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import KeyboardArrowDown from "@mui/icons-material/KeyboardArrowDown";
import {
  Add,
  AddHomeOutlined,
  LogoutOutlined,
  Search,
} from "@mui/icons-material";
import Button from "@mui/material/Button";
import { Stack } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Userdata from "./UserData";
import { useAuthContext } from "../context/AuthContext";
import AddUser from "./AddUser";
import { useState } from "react";
import { InputBase } from "@mui/material";
import { User } from "../models/model";
import { useUserStore } from "../store/user-store";

function MenuActionList() {
  const { users } = useUserStore();
  const { authUser } = useAuthContext();
  const navigate = useNavigate();
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [searchData, setSearchdata] = useState<User[]>([]);

  const doOrderFilter = (q: string) => {
    setSearchQuery(q);
    const byIdFilter = users.filter((o) => o.id === parseInt(q));
    const filterOrder =
      byIdFilter.length === 1
        ? byIdFilter
        : users.filter((o) => o.firstName?.toLowerCase().includes(q));
    setSearchdata(filterOrder as User[]);
  };

  function capitalizeFirstLetter(str: string): string {
    if (str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    } else {
      return "";
    }
  }
  function handleLogOut() {
    localStorage.removeItem("token");
    navigate("/login");
  }

  function handleAddUserClick() {
    setIsAddUserOpen((prevIsOpen) => !prevIsOpen);
  }

  const [open, setOpen] = useState(true);

  const data = [
    {
      label: "",
      icon: <Search />,
      component: (
        <Box sx={{ bgcolor: "rgba(0, 0, 0, 0.1)", borderRadius: 4, p: 1 }}>
          <InputBase
            value={searchQuery}
            onChange={(e) => doOrderFilter(e.target.value.toLowerCase())}
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            sx={{ color: "white", fontSize: 16 }} // Apply white color and adjust font size
          />
        </Box>
      ),
    },
    {
      icon: <Add />,
      label: "Add new user",
      onClick: handleAddUserClick,
    },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Paper elevation={2} sx={{ maxWidth: 200, padding: 0.1 }}>
        <Divider />
        <ListItem component="div" disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <AddHomeOutlined color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={"React App"}
              primaryTypographyProps={{
                color: "primary",
                fontWeight: "medium",
                variant: "body2",
              }}
            />
          </ListItemButton>
        </ListItem>

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
              secondary={data.map((d) => d.label)}
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
                sx={{ py: 0, height: 50, color: "rgba(255,255,255,.8)" }}
                onClick={item.onClick}
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
                {item.component}
              </ListItemButton>
            ))}
          {isAddUserOpen && (
            <AddUser isOpen={isAddUserOpen} handleOpen={handleAddUserClick} />
          )}

          <Stack p={2}>
            <Button
              onClick={handleLogOut}
              color="primary"
              variant="contained"
              startIcon={<LogoutOutlined />}
            >
              Log Out
            </Button>
          </Stack>
        </Box>
      </Paper>
      <Paper elevation={2} sx={{ maxWidth: "100%", padding: 1, marginLeft: 1 }}>
        <Userdata users={searchData.length === 0 ? users : searchData} />
      </Paper>
    </Box>
  );
}

export default MenuActionList;
