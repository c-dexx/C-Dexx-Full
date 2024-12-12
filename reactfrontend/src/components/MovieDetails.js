import { Box, Image, Text, VStack, HStack, Button, Textarea, Input, Flex ,Badge} from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AuthContext from './AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [movie, setMovie] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [rating, setRating] = useState("");

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

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(`http://www.omdbapi.com/?apikey=80e7807a&i=${id}`);
      setMovie(response.data);
    };

    fetchMovieDetails();
  }, [id]);

  const handleAddReview = () => {
    if (!user) {
      alert("You must be logged in to leave a review.");
      return;
    }
    const review = {
      text: newReview,
      rating: rating,
      author: user.name,
    };
    setReviews([...reviews, review]);
    setNewReview("");
    setRating("");
  };

  if (!movie) return (
    <Box 
    bgColor="#170B2E"
    minH="100vh"
    overflow="hidden"
    px="283px"
    >
      <Flex 
        justify="center" 
        align="center" 
        minH="100vh"
      >
        <Text fontSize="4xl" fontWeight="bold" color="white">
          Loading ...
        </Text>
      </Flex>
    </Box>
  )

  return (
    <Box 
    bgColor="#170B2E"
    minH="100vh"
    overflow={'hidden'}
    px="283px">
      <Flex mt="36">
        <Image src={movie.Poster} alt={movie.Title} rounded="md" mb="6"/>
        <VStack align={"start"} ml={"110px"}>
          <Box display="flex" gap="2" flexWrap="wrap" mb="6">
            {movie.Genre?.split(",").map((genre) => (
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
          <Text fontSize="48px" fontWeight="800" textColor="white" mb={"6"}>{movie.Title} <span style={{opacity: 0.5, marginLeft:"16px"}}>{movie.Year}</span></Text>
          <Box display="flex" alignItems="center" mb="6">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32px" 
                height="32px" 
                viewBox="0 0 24 24" 
                fill="none"
                style={{ marginRight: '4px' }}
              >
                <g clipPath="url(#clip0_54_12)">
                  <path d="M11.5 12.5L12 11V10.5L13 11L11.2844 11.1386L12 10L13.5 11.5L11.5 11L11.9307 11.1386L11.5 12.5ZM5.825 20L8.15 12.4L2 8H9.6L12 0L14.4 8H22L15.85 12.4L18.175 20L12 15.3L5.825 20Z" fill="#37FF00"/>
                </g>
                <defs>
                  <clipPath id="clip0_54_12">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <Text fontWeight="800" fontSize="32px" textColor={"white"}>
                {movie.imdbRating || "N/A"} / 10
              </Text>
            </Box>
          <Text mb="1" textColor={"white"} fontSize={"24px"} fontWeight={"500"}><strong>Overview :</strong></Text>
          <Text mb="4" textColor={"white"} fontSize={"18px"} fontWeight={"500"} w={"627px"} textAlign={"justify"}>{movie.Plot}</Text>
        </VStack>
      </Flex>

      <VStack spacing="4" align="flex-start">
        <Text fontSize="lg" fontWeight="bold" textColor={"white"}>Leave a Review</Text>
        <Input
          placeholder="Rating (out of 5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ color: 'white' }}
        />
        <Textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          style={{ color: 'white' }}
        />
        <Button bgColor={"#5638FF"} color={"white"} onClick={handleAddReview} fontSize={"15px"} fontWeight={"700"}
        _hover={{
          bgColor: "#5B1981", // Keeps the same background color
          color: "#FFFFFF",   // Keeps the same text color
        }}>Submit Review</Button>
      </VStack>

      <VStack mt="8" spacing="6">
        {reviews.map((review, index) => (
          <Box key={index} shadow="md" rounded="md">
            <HStack>
              <VStack>
                <Text ml="auto">{review.author}</Text>
                <Text>{review.rating}</Text>
              </VStack>
              <Text><strong>Rating:</strong> {review.rating}/5</Text>
            </HStack>
            <Text mt="2">{review.text}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default MovieDetails;
