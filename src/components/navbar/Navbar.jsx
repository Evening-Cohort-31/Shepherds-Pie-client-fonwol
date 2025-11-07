import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const pages = [
    { text: "New Order", url: "/" },
    { text: "View Orders", url: "/" },
    { text: "Reports", url: "reports" }
  ];
  const navigate = useNavigate();

  return (
    <AppBar position="static" sx={{ width: "100vw" }}>
      <Toolbar>
        <Typography
          variant="h6"
          noWrap
          component="a"
          href="/"
          sx={{
            mr: 2,
            display: "flex",
            fontFamily: "monospace",
            fontWeight: 700,
            letterSpacing: ".1rem",
            color: "inherit",
            textDecoration: "none",
          }}
        >
          Shepherd's Pie
        </Typography>
        <Box sx={{ flexGrow: 1, display: "flex" }}>
          {pages.map((page) => (
            <Button
              key={page.text}
              sx={{ my: 2, color: "white", display: "block" }}
              onClick={() => navigate(page.url)}
            >
              {page.text}
            </Button>
          ))}
        </Box>
        <Box sx={{ flexGrow: 0 }}>
          <IconButton onClick={() => navigate("/")}> 
            <Avatar />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
