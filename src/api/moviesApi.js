const API_KEY = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ODI4MzliNWM3YTJiMDcyMDJmMmNkYjdlNDc5Y2ZjZSIsIm5iZiI6MTc0MjIxNTA0Ny42MDMwMDAyLCJzdWIiOiI2N2Q4MTc4N2ViYzMwYTBiNDgwMTY3NWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.ZhMfr1WP-y_dHFw3fUs7YcgzbPxSoVMNe6tK-MwlBfs"; // Replace with your actual TMDb API key
const BASE_URL = "https://api.themoviedb.org/3";

// Fetch Popular Movies
export const fetchMovies = async () => {
  try {
    const response = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results; // Returns an array of movies
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Fetch Popular TV Shows
export const fetchTVShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/tv/popular?api_key=${API_KEY}&language=en-US&page=1`);
    const data = await response.json();
    return data.results; // Returns an array of TV Shows
  } catch (error) {
    console.error("Error fetching TV Shows:", error);
    return [];
  }
};

// Fetch New & Popular Content
export const fetchNewPopular = async () => {
  try {
    const response = await fetch(`${BASE_URL}/trending/all/day?api_key=${API_KEY}&language=en-US`);
    const data = await response.json();
    return data.results; // Returns trending content
  } catch (error) {
    console.error("Error fetching trending content:", error);
    return [];
  }
};
