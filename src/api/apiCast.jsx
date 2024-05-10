import axios from 'axios';

const API_KEY =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDQxZWMwYmU5YWMzYzQ0M2M5MjQ5Y2Q0YzE1YjY4ZCIsInN1YiI6IjY1ZWIzZGNlNWFiYTMyMDE4NjczNzViYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tiKRQG2MHyoRnamDPJ24Vc6Nr_LwWXRtJb6uABVUp2I';
const BASE_URL = 'https://api.themoviedb.org/3';

const getApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`,
  },
});

const getMovieCast = async () => {
  try {
    const movieId = 550;
    const response = await getApi.get(
      `/movie/${movieId}/credits?api_key=${API_KEY}&language=en-US`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default getMovieCast;
