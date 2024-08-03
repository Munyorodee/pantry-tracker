import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth'
import { Box, TextField, Button, Typography } from '@mui/material'

export default function Login({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isSignUp, setIsSignUp] = useState(false)
  const auth = getAuth()

  const handleAuth = async () => {
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(auth, email, password)
      } else {
        await signInWithEmailAndPassword(auth, email, password)
      }
      onLogin()
    } catch (error) {
      console.error('Authentication error:', error)
    }
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={2}
      bgcolor="white" // Set background color to white
      p={4} // Add padding
      m={2} // Add margin
      borderRadius={2} // Add border radius
      boxShadow={3} // Add box shadow for better visibility
    >
      <Typography variant="h4">{isSignUp ? 'Sign Up' : 'Login'}</Typography>
      {isSignUp && (
        <>
          <TextField
            label="First Name"
            variant="outlined"
            fullWidth
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            name="firstName" // Add name attribute
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </>
      )}
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" onClick={handleAuth}>
        {isSignUp ? 'Sign Up' : 'Login'}
      </Button>
      <Button onClick={() => setIsSignUp(!isSignUp)}>
        {isSignUp ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
      </Button>
    </Box>
  )
}