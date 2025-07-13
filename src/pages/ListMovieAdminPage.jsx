import React, { useState, useEffect } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import del from '../assets/button-delete.png'
import edit from '../assets/button-edit.png'
import { useSelector } from 'react-redux'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import placeholder from '../assets/image-placeholder.png'
import GenreButton from '../components/GenreButton'
import http from '../lib/http'

function ListMovieAdminPage() {
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPage, setTotalPage] = useState(1)
  const [deletingId, setDeletingId] = useState(null)
  const navigate = useNavigate()
  const posterURL = import.meta.env.VITE_MOVIE_POSTER_URL

  const currentLogin = useSelector((state) => state.currentLogin)

  const getMovies = async () => {
    setLoading(true)
    try {
      const response = await http(currentLogin.token).get(`/movies?page=${currentPage}`)
      setMovies(response.data.results)
      setTotalPage(response.data.pageInfo.totalPage)
      setError(null)
    } catch (err) {
      console.log('Error fetching movies:', err)
      setError('Failed to load movie data.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getMovies()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLogin.token, currentPage])

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  const handleDelete = async (id) => {
    setDeletingId(id)
    try {
      await http(currentLogin.token).delete(`/admin/movie/${id}`)
      await getMovies()
    } catch (err) {
      console.error('Failed to delete movie:', err)
    } finally {
      setDeletingId(null)
    }
  }

  if (currentLogin.profile.role !== 'admin') return <Navigate to='/' replace />
  if (loading) return <div className='h-svh flex flex-col justify-center items-center'>Loading...</div>
  if (error) return <div className='h-svh flex flex-col justify-center items-center text-red-500'>{error}</div>

  return (
    <div>
      <NavbarAdmin currentlyOn='movie' />
      <div className='h-[10svh]'></div>
      <div className='w-svw bg-gray-200 h-fit py-5 px-10 flex flex-col gap-10 justify-start items-center'>
        <div className='w-[85%] h-fit bg-white rounded-lg px-10 py-5 flex flex-col gap-5'>
          <div className='flex flex-row justify-between items-center w-full'>
            <span className='font-bold text-lg'>List Movie</span>
            <div className='flex flex-row justify-end items-center gap-5 w-[40%]'>
              <Link to='/add-movie' className='rounded-lg bg-orange-500 text-white px-3 py-2'>Add Movie</Link>
            </div>
          </div>
          <div className='w-full'>
            <table className='w-full table-auto text-center'>
              <thead>
                <tr>
                  <th>No</th>
                  <th>Thumbnail</th>
                  <th className='w-[30svw]'>Movie Name</th>
                  <th>Category</th>
                  <th>Released Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Array.isArray(movies) && movies.length > 0 ? (
                  movies.map((item, index) => (
                    <tr key={item.id}>
                      <td>{(currentPage - 1) * 10 + index + 1}</td>
                      <td className='py-1 flex flex-row justify-center'>
                        {item.poster ? 
                        <img
                          src={`${posterURL}/${item.poster}`}
                          alt='movie-poster'
                          className='size-[60px] object-cover rounded-sm'
                        /> : <img
                        src={placeholder}
                        alt='movie-poster'
                        className='size-[60px] object-cover rounded-sm'
                        />}
                      </td>
                      <td>{item.title}</td>
                      <td>{item.genres}</td>
                      <td>{new Date(item.releaseDate).toLocaleDateString()}</td>
                      <td className='flex flex-row justify-center items-center h-[40%] gap-1'>
                        <button
                          onClick={() => navigate(`/edit-movie/${item.id}`)}
                          className="px-3 py-1 text-white rounded-lg text-sm"
                        >
                          <img src={edit} alt='edit-icon' />
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          disabled={deletingId === item.id}
                          className={deletingId === item.id ? 'opacity-50' : ''}
                        >
                          <img src={del} alt='delete-icon' />
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan='6' className='py-10'>
                      <span className='font-bold text-2xl text-center w-full'>Belum ada data film</span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className='w-full flex flex-row justify-center items-center gap-5'>
            {Array.from({ length: totalPage }, (_, i) => (
              <GenreButton
                key={`page-${i + 1}`}
                id={`page-${i + 1}`}
                text={`${i + 1}`}
                isActive={currentPage === i + 1}
                onClick={() => handlePageChange(i + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ListMovieAdminPage
