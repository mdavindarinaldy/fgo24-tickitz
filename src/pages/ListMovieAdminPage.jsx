import React, {useState, useEffect} from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import fetchNowPlayingMovies from '../script/fetchNowPlayingMovies';

function ListMovieAdminPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchNowPlayingMovies();
        setMovies(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    getMovies();
  }, []);

  if (loading) return <div className='h-svh flex flex-col justify-center items-center'>Loading...</div>;
  if (error) return <div className='h-svh flex flex-col justify-center items-center'>{error}</div>;

  let slicedMovie = []
  if (movies !== undefined) {slicedMovie = movies.slice(0,5)}
  console.log(slicedMovie)
    
  return (
    <div>
        <NavbarAdmin currentlyOn='dashboard'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw bg-gray-200 h-[90svh] py-10 px-10 flex flex-col gap-10 justify-starts items-center'>
            <div className='w-[85%] h-[95%] bg-white rounded-lg px-10 py-5'>
                <div className='flex flex-row justify-between items-center w-full'>
                    <span className='font-bold text-lg'>List Movie</span>
                    <div className='flex flex-row justify-end items-center gap-5 w-[50%]'>
                        <select name="date-options" id="date-options" className='w-[40%] px-5 py-2 bg-gray-100 rounded-md'>
                            <option>May 2025</option>
                            <option>April 2025</option>
                            <option>June 2025</option>
                        </select>
                        <button type='button' className='rounded-lg bg-orange-500 text-white px-3 py-2'>Add Movie</button>
                    </div>
                </div>
                <div className='w-full'>
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Thumbnail</th>
                                <th>Movie Name</th>
                                <th>Category</th>
                                <th>Released Date</th>
                                <th>Duration</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slicedMovie.map((item, index) => (
                                <tr key={index} >
                                    <td>{index+1}</td>
                                    <td><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="movie-poster" className='size-[60px] object-cover'/></td>
                                    <td>{item.title}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListMovieAdminPage