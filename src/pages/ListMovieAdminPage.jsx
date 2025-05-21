import React, {useState, useEffect} from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import fetchNowPlayingMovies from '../script/fetchNowPlayingMovies'
import del from '../assets/button-delete.png'
import edit from '../assets/button-edit.png'
import eye from '../assets/button-eye.png'

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
    
  return (
    <div>
        <NavbarAdmin currentlyOn='dashboard'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw bg-gray-200 h-[90svh] py-5 px-10 flex flex-col gap-10 justify-starts items-center'>
            <div className='w-[85%] h-[95%] bg-white rounded-lg px-10 py-5 flex flex-col gap-5'>
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
                    <table className='w-full table-auto text-center'>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Thumbnail</th>
                                <th>Movie Name</th>
                                <th>Category</th>
                                <th>Released Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {slicedMovie.map((item, index) => (
                                <tr key={index} >
                                    <td>{index+1}</td>
                                    <td className='py-1 flex flex-row justify-center'><img src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt="movie-poster" className='size-[60px] object-cover rounded-sm'/></td>
                                    <td>{item.title}</td>
                                    <td>Action</td>
                                    <td>{item.release_date}</td>
                                    <td className='flex flex-row justify-center items-center h-[40%] gap-1'>
                                        <button><img src={eye} alt="eye-icon"/></button>
                                        <button><img src={edit} alt="edit-icon" /></button>
                                        <button><img src={del} alt="delete-icon" /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className='w-full flex flex-row justify-center items-center gap-5'>
                    <button type='button' className='border-1 border-gray-400 px-3 py-1 rounded-sm'>1</button>
                    <button type='button' className='border-1 border-gray-400 px-3 py-1 rounded-sm'>2</button>
                    <button type='button' className='border-1 border-gray-400 px-3 py-1 rounded-sm'>3</button>
                    <button type='button' className='border-1 border-gray-400 px-3 py-1 rounded-sm'>4</button>
                    <button type='button' className='border-1 border-gray-400 px-3 py-1 rounded-sm'>5</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ListMovieAdminPage