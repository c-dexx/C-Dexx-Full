import { Box, Select, Button, Input } from '@chakra-ui/react';

const FilterSortBar = ({ filters, setFilters, handleSearch }) => {
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box mt="0" display="flex" justifyContent='center' alignItems="center" fontSize='lg' ml="110px">
      <Select name="genre" placeholder="Filter by Genre" onChange={handleFilterChange} mr="4" w={'160px'} bg={'#D9D9D9'}>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="horror">Horror</option>
        <option value="animation">Animation</option>
      </Select>

      <Select name="sortBy" placeholder="Sort by" onChange={handleFilterChange} mr="4" w={'160px'} bg={'#D9D9D9'}>
        <option value="title">Title</option>
        <option value="year">Year</option>
        <option value="rating">Rating</option>
      </Select>

      <Input
        name="rating"
        placeholder="Min Rating"
        type="number"
        min="0"
        max="10"
        onChange={handleFilterChange}
        w="160px"
        mr="4"
        bg={'#D9D9D9'}
      />

      <Button onClick={handleSearch} bgColor='#9E3CD7' color="#FFFFFF" fontWeight="extrabold"
      _hover={{
        bgColor: "#5B1981", // Keeps the same background color
        color: "#FFFFFF",   // Keeps the same text color
      }}>
        Apply
      </Button>
    </Box>
  );
};

export default FilterSortBar;
