const fetchChosenMovie = async (id) => {
  try {
    if(id) {
      const res = await fetch(
          `https://api.themoviedb.org/3/movie/${id}?&append_to_response=credits`,
          {
            method: 'GET',
              headers: {
                accept: 'application/json',
                Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
              }
          })
      const data = await res.json()
      return data
    }
  } catch (error) {
    throw new Error('Gagal mengambil data film: ' + error.message)
  }
}

fetchChosenMovie()

export default fetchChosenMovie