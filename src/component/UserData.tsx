import { useEffect, useState } from "react";
import { useSnackbar } from "../context/snackbar-context";

import createAxiosInstance from "../api/axios-config";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import { User } from "../models/model";
import ListItemButton from "@mui/material/ListItemButton";
import { Edit } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import UpdateUserModal from "./UpdateUser";

export default function Userdata() {
  const { showSnackbar } = useSnackbar();
  const [user, setUser] = useState<User[]>([]);
  const [userToUpdate, setUserToUpdate] = useState<User>();
  async function fetchAllUsers() {
    try {
      const response = await createAxiosInstance.get("users");
      setUser(response.data);
    } catch (error) {
      showSnackbar("The request is failing ", "error");
    }
  }
  useEffect(() => {
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <List
      dense
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
    >
      {userToUpdate !== undefined ? (
        <UpdateUserModal user={userToUpdate} />
      ) : (
        <>
          {user.map((u) => {
            const labelId = `checkbox-list-secondary-label-${u}`;
            return (
              <ListItem
                sx={{ margin: 2 }}
                key={u.id}
                secondaryAction={
                  <>
                    <IconButton
                      edge="end"
                      onClick={() => {
                        setUserToUpdate(u);
                      }}
                    >
                      <Edit />
                    </IconButton>
                  </>
                }
                disablePadding
              >
                <ListItemButton>
                  <ListItemAvatar>
                    <Avatar sx={{ color: "red" }}>
                      {u.firstName?.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    id={labelId}
                    primary={`${u?.firstName}`}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </>
      )}
    </List>
  );
}
