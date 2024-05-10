import axios from "axios";

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4ZDQxZWMwYmU5YWMzYzQ0M2M5MjQ5Y2Q0YzE1YjY4ZCIsInN1YiI6IjY1ZWIzZGNlNWFiYTMyMDE4NjczNzViYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tiKRQG2MHyoRnamDPJ24Vc6Nr_LwWXRtJb6uABVUp2I';

const getApi = axios.create({
    baseURL: BASE_URL,
    headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`
    }
});

const getMovieSearch = async (query) => {
    try {
        const response = await getApi.get(`/search/movie?language=en-US&page=1&include_adult=false&query=${query}`);
        return response.data.results;
    } catch (error) {
        throw error;
    }
};

export default getMovieSearch;
