import { useState } from "react";
import { Box, TextField, Button, Typography, Paper } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    setError("");
    const res = await fetch(
      "https://flipkart-backend-1-pjtm.onrender.com/auth/signup",
      {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
      navigate("/");
    } else {
      setError(data.error || "Signup failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{
        background: "linear-gradient(135deg, #ece9e6, #ffffff)",
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 5,
          width: 420,
          borderRadius: 4,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          color="primary"
          mb={3}
        >
          Create Account
        </Typography>

        <TextField
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          label="Email Address"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
        />

        <TextField
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          label="Password"
          fullWidth
          margin="normal"
          variant="outlined"
          sx={{
            "& .MuiInputBase-root": {
              borderRadius: 2,
            },
          }}
        />

        {error && (
          <Typography color="error" variant="body2" mt={1} textAlign="center">
            {error}
          </Typography>
        )}

        <Button
          onClick={handleSignup}
          variant="contained"
          fullWidth
          sx={{
            mt: 3,
            borderRadius: 2,
            py: 1.2,
            fontWeight: "bold",
            background: "linear-gradient(90deg, #1e88e5, #42a5f5)",
            "&:hover": {
              background: "linear-gradient(90deg, #1565c0, #1e88e5)",
            },
          }}
        >
          Sign Up
        </Button>

        <Typography variant="body2" mt={3} textAlign="center">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "#1e88e5",
              fontWeight: 500,
            }}
          >
            Login
          </Link>
        </Typography>
      </Paper>
    </Box>
  );
}

export default Signup;
