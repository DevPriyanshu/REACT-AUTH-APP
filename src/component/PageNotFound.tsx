import { Home } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export default function PageNotFound() {
  const navigate = useNavigate();
  function handleHome() {
    navigate("/login");
  }
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "center",
        height: "100vh",
        width: "100vw",
        flexDirection: "column",
      }}
    >
      <Typography variant="h2">404 Error</Typography>
      <Typography variant="h5">
        Oops, we can't seem to find what you're looking for.
      </Typography>

      <Typography
        variant="caption"
        sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
        onClick={handleHome}
      >
        Click the home icon to access the home page
        <IconButton color="primary" size="small" sx={{ marginLeft: 1 }}>
          <Home fontSize="small" />
        </IconButton>
      </Typography>
    </Box>
  );
}
