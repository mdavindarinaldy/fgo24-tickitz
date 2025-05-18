const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const fetchUpcomingMovies = async () => {
  const pages = [
    'page=1',
    'page=2',
    'page=3',
    'page=4',
    'page=5',
    'page=6',
    'page=7'
  ]
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&${pages[0]}&region=ID&language=id`,
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