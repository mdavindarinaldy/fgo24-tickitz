import React, { useState, useEffect } from 'react';
import fetchUpcomingMovies from '../script/fetchUpcomingMovies';

function NowPlayingMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchUpcomingMovies();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    getMovies();
  }, []);

  console.log(movies)
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Film Sedang Tayang di Indonesia</h1>
      <div className="grid grid-cols-2 gap-4">
        {movies.map((movie) => (
          <div key={movie.id} className="border p-2 rounded">
            <h2 className="text-lg font-semibold">{movie.title}</h2>
            <p>Tanggal Rilis: {movie.release_date}</p>
            {movie.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="mt-2 rounded-3xl"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default NowPlayingMovies;