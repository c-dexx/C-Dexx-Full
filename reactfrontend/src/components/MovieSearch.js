import { Box, Input, Button, SimpleGrid, Text, Flex, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import FilterSortBar from './FilterSortBar';
import moviesData from './movielist.json';

const MovieSearch = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState(moviesData.movies);
  const [filters, setFilters] = useState({
    genre: '',
    sortBy: '',
    rating: '',
  });

  const getGenreColor = (genre) => {
    switch (genre?.toLowerCase()) {
      case "action":
        return "#DB1B1F";
      case "comedy":
        return "#8EDD32";
      case "sci-fi":
        return "#9E3CD7";
      case "drama":
        return "#757575";
      case "horror":
        return "purple.600";
      case "romance":
        return "pink.400";
      default:
        return "gray.500";
    }
  };

  const handleSearch = () => {
    let filteredMovies = moviesData.movies;

    if (query) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply genre filter
    if (filters.genre) {
      filteredMovies = filteredMovies.filter(movie =>
        movie.genre.toLowerCase().includes(filters.genre.toLowerCase())
      );
    }

    // Apply rating filter
    if (filters.rating) {
      filteredMovies = filteredMovies.filter(movie =>
        parseFloat(movie.rating) >= parseFloat(filters.rating)
      );
    }

    // Apply sorting
    if (filters.sortBy === 'title') {
      filteredMovies = filteredMovies.sort((a, b) => a.title.localeCompare(b.title));
    } else if (filters.sortBy === 'year') {
      filteredMovies = filteredMovies.sort((a, b) => b.year - a.year);
    } else if (filters.sortBy === 'rating') {
      filteredMovies = filteredMovies.sort((a, b) => b.rating - a.rating);
    }

    setMovies(filteredMovies);
  };

  return (
    <Box 
      bgColor="#170B2E"
      minH="100vh"
      overflow={'hidden'}>
    <Flex justifyContent="center" alignItems="center" mt="36">
      <Input
        placeholder="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        w="300px"
        fontSize='lg'
        bg={'#D9D9D9'}
      />
      <Button onClick={handleSearch} bgColor='#9E3CD7' color="#FFFFFF" ml="4" fontWeight="extrabold"
      _hover={{
        bgColor: "#5B1981", // Keeps the same background color
        color: "#FFFFFF",   // Keeps the same text color
      }}>
        Search
      </Button>

      <FilterSortBar filters={filters} setFilters={setFilters} handleSearch={handleSearch} />
    </Flex>
  
    <SimpleGrid 
      columns={{ sm: 1, md: 2, lg: 3 }} 
      gap="6" 
      mt="8"
      mb="32"
      maxW="1200px"
      mx="auto"
      px="4"
    >
    {movies.map((movie) => (
        <Box
          key={movie.id}
          position="relative"
          w="100%"
          h="600px"
          bgImage={`url(${movie.poster || "fallback-image.jpg"})`}
          bgSize="cover"
          bgPosition="center"
          rounded="lg"
          overflow="hidden"
          shadow="md"
          transition="transform 0.3s, box-shadow 0.3s"
          alignItems="center"
          _hover={{ transform: "scale(1.05)", shadow: "lg" }}
        >
          {/* Gradient Overlay */}
          <Box
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            bgGradient="linear(to-t, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.2))"
          />
          {/* Movie Information */}
          <Box
            position="absolute"
            bottom="4"
            left="4"
            right="4"
            zIndex="1"
            color="white"
          >
            {/* Genre Badge */}
            <Box display="flex" gap="2" flexWrap="wrap">
              {movie.genre?.split(",").map((genre) => (
                <Badge
                  key={genre.trim()}
                  rounded="full"
                  px="2"
                  py="1"
                  fontSize="xs"
                  bg={getGenreColor(genre.trim())}
                >
                  {genre.trim()}
                </Badge>
              ))}
            </Box>
            {/* IMDb Rating */}
            <Text fontWeight="bold" fontSize="3xl" mt="2">
              {movie.title || "N/A"}
            </Text>

            <Box display="flex" alignItems="center" mt="2">
              <Text fontWeight="bold" fontSize="xl">
                {movie.rating || "N/A"}
              </Text>
            </Box>
          </Box>
          {/* Clickable Details Overlay */}
          <Box
            as={Link}
            to={`/movie/${movie.id}`}
            position="absolute"
            top="0"
            left="0"
            w="100%"
            h="100%"
            zIndex="2"
            _hover={{ cursor: "pointer" }}
          />
        </Box>
    ))}
    </SimpleGrid>

    <Text fontWeight="bold" fontSize="xl" textColor="white" textAlign="center" mb="16">
      Ⓒ - 2024 Cdex
    </Text>

    </Box>
  );
};

export default MovieSearch;
