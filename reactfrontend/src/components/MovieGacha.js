import { Box, Button, Image, Text, VStack, Badge } from '@chakra-ui/react';
import { useState } from 'react';
import moviesData from './movielist.json';

const MovieGacha = () => {
  const [movie, setMovie] = useState(null);

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

  const getRandomMovie = () => {
    const randomIndex = Math.floor(Math.random() * moviesData.movies.length);
    setMovie(moviesData.movies[randomIndex]);
  };

  return (
    <Box 
    textAlign="center"
    bgColor={"#170B2E"}
    minH="100vh"
    overflow={'hidden'}>
      <VStack spacing="4" mt="36">
        <Button bgColor={"#477023"} onClick={getRandomMovie} color={"white"}
        _hover={{
          bgColor: "#23703D", // Keeps the same background color
          color: "#FFFFFF",   // Keeps the same text color
        }}>
          Get Random Movie
        </Button>

        {movie && (
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            textAlign="center"
            mt={"60px"}
          >
            <Image 
              src={movie.poster}
              alt={movie.title}
              rounded="md"
              mb="6"
              width="400px" // Fixed width
              height="550px" // Fixed height
              objectFit="cover" // Ensures the image is scaled and cropped properly
              />
            <Text fontSize="48px" fontWeight="800" textColor="white" mb={"6"}>{movie.title} <span style={{opacity: 0.5, marginLeft:"16px"}}>{movie.year}</span></Text>
            <Box display="flex" alignItems="center" mb="6">
              <Text fontWeight="800" fontSize="32px" textColor={"white"}>
                {movie.rating || "N/A"} / 10
              </Text>
            </Box>
            <Box display="flex" gap="2" flexWrap="wrap" mb="6">
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
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default MovieGacha;
