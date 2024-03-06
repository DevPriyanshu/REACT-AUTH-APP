import { Divider, Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { User, UserControllerApi } from "../api";
import apiConfig, { ApiConfiguration, setApiToken } from "../api/api-config";
import { useSnackbar } from "../context/snackbar-context";
import { useAuthContext } from "../context/AuthContext";

export default function Userdata() {
  const { showSnackbar } = useSnackbar();
  const [user, setUser] = useState<User[]>([]);
  const { auth } = useAuthContext();
  console.log({ auth });
  useEffect(() => {
    async function fetchAllUsers() {
      console.log(auth.data.token);
      setApiToken(auth.data.token)
      new UserControllerApi(ApiConfiguration)
        .getAllUsersUsingGET()
        .then((res) => {
          console.log(res.data);
          setUser(res.data);
          showSnackbar(`Data Loaded Succesfully.`, "success");
        })
        .catch((error) => {
          console.log({ error });
          showSnackbar(
            "Something went wrong while fetching the data.",
            "error"
          );
        });
    }
    fetchAllUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box p={3}>
      <Paper elevation={0} sx={{ maxWidth: 200 }}>
        <Divider />
        <Typography>User Data To Show</Typography>
        {user.map((m) => (
          <Typography key={m.id}>{m.firstName}</Typography>
        ))}
      </Paper>
    </Box>
  );
}
