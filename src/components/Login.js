import { Box, Button, Input, Text, Heading } from '@chakra-ui/react';
import { useContext, useState } from 'react';
import AuthContext from './AuthContext'; // Assuming you have an AuthContext to store login state
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // To manage logged-in state
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      // Send login credentials to backend
      const response = await axios.post('http://localhost:3000/users/login', {
        email,
        password,
      });

      if (response.status === 200) {
        login(response.data.user); // You can store the logged-in user in context or localStorage
        console.log("success");
        console.log(response.data.user);
        setError('');
        navigate('/');
        
      }
    } catch (err) {
      // Handle login error (invalid credentials, etc.)
      if (err.response && err.response.status === 401) {
        setError('Invalid email or password');
      } else {
        setError('Login failed. Please try again later.');
      }
      console.error('Login error:', err); // Log error for debugging
    }
  };

  return (
    <Box
      bgGradient="linear(to-r, gray.700, gray.900)"
      minH="100vh"
      overflow={'hidden'}
    >
      <Box maxW="sm" mx="auto" p="8" bg="gray.50" shadow="md" rounded="md" mt="72">
        <Heading as="h1" mb="6">Login</Heading>
        {error && <Text color="red.500" mb="4">{error}</Text>}
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="4"
        />
        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          mb="4"
        />
        <Button onClick={handleSubmit} colorScheme="blue" width="full">Login</Button>
      </Box>
    </Box>
  );
};

export default Login;
