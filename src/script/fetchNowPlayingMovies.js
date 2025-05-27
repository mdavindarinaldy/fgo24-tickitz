const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchNowPlayingMovies = async (page=1) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&page=${page}&region=ID&language=id`,
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

fetchNowPlayingMovies()

export default fetchNowPlayingMovies