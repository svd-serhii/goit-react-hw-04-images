import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '31646897-e0e737d73d0d9524e45efe21c';

export const fetchImg = async (request, page) => {
  const url = `${BASE_URL}?key=${KEY}&q=${request}&image_type=photo&orientation=horizontal&per_page=12&page=${page}`;
  try {
    const response = await axios.get(url);
    return response.data.hits;
  } catch (error) {
    return Promise.reject(new Error('Something get wrong!'));
  }
};
