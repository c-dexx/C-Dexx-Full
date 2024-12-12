import { Box, Heading, Text, Button, Container, VStack } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import Wallpaper from '../asset/home-wallpaper.jpeg';

const LandingPage = () => {
  return (
    <Box
      as="main"
      height="100vh"
      width="100vw"
      overflow="hidden"
      position="relative"
      className="App" // Added App class from your CSS
    >
      {/* Background Image Container */}
      <Box
        position="absolute"
        top="0"
        left="0"
        right="0"
        bottom="0"
        backgroundImage={`url(${Wallpaper})`}
        backgroundSize="cover"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          right="0"
          bottom="0"
          bg="blackAlpha.600"
        />
      </Box>

      {/* Content Container */}
      <Container
        maxW="container.xl"
        height="100%"
        position="relative"
        zIndex="1"
      >
        <VStack
          height="100%"
          justify="center"
          spacing={8}
          align="center"
        >
          <Heading
            as="h1"
            color="#FFF"
            fontSize="9xl"
            fontStyle="normal"
            fontWeight={900}
            lineHeight="normal"
            textAlign="center"
          >
            Welcome to C-dex
          </Heading>
          
          <Text
            fontSize="4xl"
            color="white"
            textAlign="center"
            fontFamily="var(--font-body)"  // Using the CSS variable for body text
          >
            Explore movies, read reviews, and rate your favorites.
          </Text>

          <Button
            as={Link}
            to="/movies"
            size="lg"
            colorScheme="blue"
            fontSize="xl"
            px={8}
            py={6}
            fontFamily="var(--font-body)"  // Using the CSS variable for button
            fontWeight="600"
            _hover={{
              transform: 'translateY(-2px)',
              boxShadow: 'lg',
            }}
            transition="all 0.2s"
          >
            Explore Movies
          </Button>
        </VStack>
      </Container>
    </Box>
  );
};

export default LandingPage;