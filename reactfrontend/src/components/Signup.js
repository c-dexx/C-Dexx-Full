import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { useState, useContext } from 'react';
import AuthContext from './AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:3000/users', {
        nama,
        email,
        password
      });
      login(response.data);
      console.log(response.data);
      navigate('/');
    } catch (error) {
      // Handle login error (invalid credentials, etc.)
      if (error.response && error.response.status === 500) {
        setError('Please enter a valid email');
      } else {
        setError('Login failed. Please try again later.');
      }
      console.error('Login error:', error); // Log error for debugging
    }
  };

  return (
  <Box
  bgGradient="linear(to-r, gray.700, gray.900)"
  minH="100vh"
  overflow={'hidden'}
  >
    <Box maxW="sm" mx="auto" p="8"  bg="gray.50" shadow="md" rounded="md" mt="72">
      <Heading as="h1" mb="6">Sign Up</Heading>
      {error && <Text color="red.500" mb="4">{error}</Text>}
      <Input
        placeholder="Name"
        value={nama}
        onChange={(e) => setName(e.target.value)}
        mb="4"
      />
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        mb="4"
      />
      <Input
        placeholder="Password"
        value={password}
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        mb="6"
      />
      <Button colorScheme="blue" w="full" onClick={handleSubmit}>
        Sign Up
      </Button>
      <Text mt="4" textAlign="center">
        Already have an account? <Link to="/login">Login</Link>
      </Text>
    </Box>
  </Box>
  );
};

export default Signup;
