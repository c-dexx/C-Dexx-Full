import { Box, Image, Text, VStack, HStack, Button, Textarea, Input, Flex, Badge } from '@chakra-ui/react';
import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import moviesData from './movielist.json';
import AuthContext from './AuthContext';
import axios from 'axios';

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
    const movie = moviesData.movies.find((movie) => movie.id === parseInt(id));
    setMovie(movie);
  }, [id]);

  const handleAddReview = async () => {
    if (!user) {
      alert("You must be logged in to leave a review.");
      return;
    }

    const review = {
      author: user.name,
      text: newReview,
      rating: rating,
      movie: id
    };
    
    try {
      await axios.post('http://localhost:4000/api/review', review);
      setNewReview("");
      setRating("");
      window.location.reload(); // Refresh the page after submitting the review
    } catch (error) {
      console.error("There was an error adding the review!", error);
    }
  };

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/review', {
          params: { movie: id } // Replace 'MOVIE_NAME' with the actual movie name
        });
        setReviews("");
        setReviews(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("There was an error fetching the reviews!", error);
      }
    };
  
    fetchReviews();
  }, []);

  if (!movie) return (
    <Box 
    bgColor="#170B2E"
    minH="100vh"
    overflow="hidden"
    px={{ base: "20px", md: "50px", lg: "100px" }}
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
    px={{ base: "20px", md: "50px", lg: "500px" }}>
        <Flex mt="44" flexDirection={{ base: "column", md: "row" }} ml="auto" mr="auto" maxW="1200px">
        <Image src={movie.poster} alt={movie.title} rounded="md" mb="6" maxW={{ base: "100%", md: "300px" }} />
        <VStack align={"start"} ml={{ base: "0", md: "110px" }} mt={{ base: "6", md: "0" }}>
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
          <Text fontSize="48px" fontWeight="800" textColor="white" mb={"6"}>{movie.title} <span style={{opacity: 0.5, marginLeft:"16px"}}>{movie.year}</span></Text>
          <Box display="flex" alignItems="center" mb="6">
            <Text fontWeight="800" fontSize="32px" textColor={"white"}>
              {movie.rating || "N/A"} / 10
            </Text>
          </Box>
          <Text mb="1" textColor={"white"} fontSize={"24px"} fontWeight={"500"}><strong>Overview :</strong></Text>
          <Text mb="4" textColor={"white"} fontSize={"18px"} fontWeight={"500"} maxW={{ base: "100%", md: "627px" }} textAlign={"justify"}>{movie.plot}</Text>
        </VStack>
      </Flex>
      

      <VStack spacing="4" align="flex-start" maxW="100%">
        <Text fontSize="lg" fontWeight="bold" textColor={"white"}>Leave a Review</Text>
        <Input
          placeholder="Rating (out of 5)"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
          style={{ color: 'white' }}
          width={"20%"}
        />
        <Textarea
          placeholder="Write your review..."
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          style={{ color: 'white' }}
          width={"100%"}
        />
        <Button bgColor={"#5638FF"} color={"white"} onClick={handleAddReview} fontSize={"15px"} fontWeight={"700"}
        _hover={{
          bgColor: "#5B1981", // Keeps the same background color
          color: "#FFFFFF",   // Keeps the same text color
        }}>Submit Review</Button>
      </VStack>

      <VStack mt="8" spacing="6" maxW="100%" mb="8">
        {reviews.map((review, index) => (
          <Box key={index} p="4" shadow="md" rounded="md" bg="gray.100" w="100%">
            <HStack>
              <Text><strong>Rating:</strong> {review.rating}/5</Text>
              <Text ml="auto"><strong>Author:</strong> {review.author}</Text>
            </HStack>
            <Text mt="2">{review.text}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default MovieDetails;
