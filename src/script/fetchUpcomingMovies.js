const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchUpcomingMovies = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&page=1&region=ID&language=id`,
      {
        method: 'GET',
          headers: {
            accept: 'application/json',
            Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
          }
      }
    )
    const data = await response.json()
    return data.results
  } catch (error) {
    throw new Error('Gagal mengambil data film: ' + error.message)
  }
}

fetchUpcomingMovies()

export default fetchUpcomingMovies