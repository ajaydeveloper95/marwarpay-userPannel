import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  Link,
  Paper,
  IconButton,
  Checkbox,
  FormControlLabel,
  Snackbar,
  Alert
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { domainBase } from "../../helpingFile";

const API_ENDPOINT = `${domainBase}apiUser/v1/userRoute/login`;

const Login = () => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(API_ENDPOINT, {
        userName,
        password,
      });

      // Extract tokens from response data
      const { accessToken, refreshToken } = response.data.data;
      

      if (accessToken && refreshToken) {
        // Save tokens or user data if needed
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        if (rememberMe) {
          // Save the expiration time for 24 hours
          const expirationTime = new Date().getTime() + 24 * 60 * 60 * 1000;
          localStorage.setItem("expirationTime", expirationTime);
        } else {
          // Save a shorter expiration time if "Remember me" is not checked
          const expirationTime = new Date().getTime() + 60 * 60 * 1000;
          localStorage.setItem("expirationTime", expirationTime);
        }

        // Show success message
        setSnackbarMessage("Login successful!");
        setOpenSnackbar(true);

        // Redirect to homepage/dashboard after a short delay
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        throw new Error("Access token or refresh token is missing in response.");
      }

    } catch (err) {
      console.error("Login error:", err);
      setSnackbarMessage("Login failed. Please try again.");
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ backgroundImage: "url('images/bgimgmarwar.jpg')", backgroundSize: "cover",
      backgroundPosition: "center",backgroundRepeat:"no-repeat" }}>
    <Box
      sx={{
        padding:"92px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
 <Container
  // component="main"
  sx={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  // Adjust the height as needed
  }}
>
  <Box
    sx={{
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      alignItems: "center",
    }}
  >
    {/* Left side image */}
    <Box
  sx={{
    flex: 1, // Takes up 50% of the width
    display: { xs: "none", sm: "flex" }, // Hide on extra-small screens (less than 500px)
    justifyContent: "center",
    alignItems: "center",
  }}
>
  <img
    src="images/login.svg"
    alt="Logo"
    style={{
      width: "80%", // Adjust the width of the image as needed
      height: "auto",
    }}
  />
</Box>


    {/* Right side form */}
    <Box
      sx={{
        flex: 1, // Takes up 50% of the width
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3} 
        sx={{
          padding: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          borderRadius: 2,
          width: "100%",
          maxWidth: "400px", // Adjust the form width as needed
        }}
      >
            <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              width: "100%",
              position: 'relative',
              // right:'50%',
            }}
          >
            <img
              src="images/logologin.png"
              alt="Logo"
              style={{
                // width: 70,
                // height: 70,
                
                position: 'absolute',
                bottom: '-1px'
              }}
            />
          </Box>
        <Typography
          component="h1"
          variant="h4"
          gutterBottom
          style={{ fontWeight: 700, marginTop: "20px" }}
        >
          Log In
        </Typography>
        <Box component="form" onSubmit={handleLogin} sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="userName"
            autoComplete="userName"
            autoFocus
            value={userName}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
            }
            label="Remember me"
            sx={{
              "& .MuiFormControlLabel-label": {
                color: "#1976d2",
                "&:hover": {
                  color: "black",
                },
              },
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "#1976d2",
                  textDecoration: "none",
                  "&:hover": {
                    color: "black",
                  },
                }}
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  </Box>
</Container>


      

      {/* Snackbar for notifications */}
      <Snackbar
  open={openSnackbar}
  autoHideDuration={6000}
  onClose={handleCloseSnackbar}
  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} // Set position to top-right
>
  <Alert 
    onClose={handleCloseSnackbar} 
    severity={snackbarMessage.includes("failed") ? "error" : "success"}
    sx={{ width: '100%' }} // Ensure full-width for better appearance
  >
    {snackbarMessage}
  </Alert>
</Snackbar>
    </Box>
    <Box
        sx={{
          marginTop:'-80px',
          display: "flex",
          paddingBottom:'18px'
          // gap: 1,
        }}
      >
        <IconButton href="https://www.facebook.com/Marwarpay/"   target="_blank" sx={{ color: "black", fontSize: 50 }}>
          <FacebookIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
        <IconButton href="https://www.instagram.com/marwarpayofficial/"  target="_blank"  sx={{ color: "black", fontSize: 50 }}>
          <InstagramIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
        <IconButton href="https://www.twitter.com"  target="_blank"  sx={{ color: "black", fontSize: 50 }}>
          <TwitterIcon sx={{ fontSize: "inherit" }} />
        </IconButton>
      </Box>
    </div>
  );
};

export default Login;
