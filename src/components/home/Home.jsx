import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
      }}
    >
      <Card
        sx={{
          p: 4,
          boxShadow: 6,
          borderRadius: 3,
          minWidth: 350,
          maxWidth: 400,
          backgroundColor: "#fff",
        }}
      >
        <CardContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{ fontWeight: 700, mb: 1, color: "#2d3748" }}
          >
            Welcome to Shephard's Pies
          </Typography>
          <Typography variant="h5" sx={{ color: "#4a5568", mb: 2 }}>
            The home of all your Pizza needs!
          </Typography>
        </CardContent>
        <CardActions sx={{ justifyContent: "center" }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ px: 4, py: 1, borderRadius: 2, fontWeight: 600 }}
            //Update with actual link
            onClick={() => navigate("/")}
          >
            Order Here
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};
