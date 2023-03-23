import axios from 'axios';
const API_KEY = '33139428-a4880fd896903b0937526f617';

export const fetchImages = async ({ name, page }) => {
  const response = await axios.get(
    `https://pixabay.com/api/?q=${name}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`
  );
  return response.data;
};
