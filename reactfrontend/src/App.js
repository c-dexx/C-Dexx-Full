import { ChakraProvider, Box, Flex, Grid } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import MovieSearch from './components/MovieSearch';
import MovieDetails from './components/MovieDetails';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import Signup from './components/Signup';
import MovieGacha from './components/MovieGacha';   // Import Gacha component
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <ChakraProvider>
      <AuthProvider>
        <Router>
          <Box as="main" w="full">
            <Navbar/>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/movies" element={<MovieSearch />} />
              <Route path="/movie/:id" element={<MovieDetails />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/gacha" element={<MovieGacha />} />  {/* Add Gacha route */}
            </Routes>
          </Box>
        </Router>
      </AuthProvider>
    </ChakraProvider>
  );
}

export default App;
