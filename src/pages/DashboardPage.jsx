import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useForm } from 'react-hook-form'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
)

function DashboardPage() {
  const currentLogin = useSelector((state) => state.currentLogin)
  const transaction = useSelector((state) => state.history.data)
  const movies = [...new Set(transaction.map((item)=>item.title))]
  const {register, handleSubmit} = useForm({})

  const [dataMovie, setDataMovie] = useState({})
  const [dataCategory, setDataCategory] = useState({})
  const [dataTimeFiltered, setDataTimeFiltered] = useState({})
  const [dataLocationGenre, setDataLocationGenre] = useState({})
  const [selectedMovie, setSelectedMovie] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [selectedTimeMovie, setSelectedTimeMovie] = useState('')
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('')
  const [selectedGenreLocation, setSelectedGenreLocation] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')

  const [dataDummy, setDataDummy] = useState([])
  const [error, setError] = useState(null)
  const [dummyMovies, setDummyMovies] = useState([])  
  const [dummyGenres, setDummyGenres] = useState([])

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch('/transaction.json')
        const data = await res.json()
        console.log(data)
        setDataDummy(data)
        setDummyMovies([...new Set(data.map((item) => item.title))])
        setDummyGenres([...new Set(data.flatMap((item) => item.genres))])
      } catch(err) {
        setError(err.message)
      }
    }
    getData()
  }, [])

  function setUpDataMovie(value) {
    const filteredData = transaction?.filter((movie)=> movie.title === value.movies)
    const dateDaily = Object.values(filteredData?.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue.date]) {
          accumulator[currentValue.date] = { date: currentValue.date, sales: 0 }
      }
      accumulator[currentValue.date].sales += currentValue.payment
      return accumulator
    }, {}))

    setDataMovie({
      labels: dateDaily?.map((item)=>item.date),
      datasets: [
        {
          label: 'Sales',
          backgroundColor: 'rgba(253, 155, 42, 0.8)',
          borderColor: 'rgba(253, 155, 42, 1)',
          borderWidth: 1,
          data: dateDaily?.map((item)=>item.sales),
        },
      ],
    })
  }

  function setUpDataCategory(value) {
    const filteredData = transaction?.filter((movie)=> movie.location === value.location)
    const sales = Object.values(filteredData?.reduce((accumulator, currentValue) => {
        if (!accumulator[currentValue.cinema]) {
            accumulator[currentValue.cinema] = { cinema:currentValue.cinema, sales: 0 }
        }
        accumulator[currentValue.cinema].sales += currentValue.payment
        return accumulator
      }, {}))
  
    setDataCategory({
        labels: sales?.map((item)=>item.cinema),
        datasets: [
            {
            label: 'Sales',
            backgroundColor: 'rgba(253, 155, 42, 0.8)',
            borderColor: 'rgba(253, 155, 42, 1)',
            borderWidth: 1,
            data: sales?.map((item)=>item.sales),
            },
        ],
    })
  }

  function setUpDataTimeFiltered(value) {
    const filteredData = dataDummy?.filter((movie) => movie.title === value.movieTime)
    let groupedData = []

    if (value.period === 'Daily') {
      groupedData = Object.values(filteredData?.reduce((accumulator, currentValue) => {
        if (!accumulator[currentValue.date]) {
          accumulator[currentValue.date] = { date: currentValue.date, sales: 0 }
        }
        accumulator[currentValue.date].sales += currentValue.payment
        return accumulator
      }, {}))
    } else if (value.period === 'Weekly') {
      groupedData = Object.values(filteredData?.reduce((accumulator, currentValue) => {
        const date = new Date(currentValue.date)
        const weekStart = new Date(date.setDate(date.getDate() - date.getDay()))
        const weekKey = weekStart.toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: 'numeric' })
        if (!accumulator[weekKey]) {
          accumulator[weekKey] = { date: `Week of ${weekKey}`, sales: 0 }
        }
        accumulator[weekKey].sales += currentValue.payment
        return accumulator
      }, {}))
    } else if (value.period === 'Monthly') {
      groupedData = Object.values(filteredData?.reduce((accumulator, currentValue) => {
        const date = new Date(currentValue.date)
        const monthKey = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
        if (!accumulator[monthKey]) {
          accumulator[monthKey] = { date: monthKey, sales: 0 }
        }
        accumulator[monthKey].sales += currentValue.payment
        return accumulator
      }, {}))
    }

    setDataTimeFiltered({
      labels: groupedData?.map((item) => item.date),
      datasets: [
        {
          label: 'Sales',
          backgroundColor: 'rgba(253, 155, 42, 0.8)',
          borderColor: 'rgba(253, 155, 42, 1)',
          borderWidth: 1,
          data: groupedData?.map((item) => item.sales),
        },
      ],
    })
  }

  function setUpDataLocationGenre(value) {
    const filteredData = dataDummy?.filter((movie) => movie.location === value.location && movie.genres.includes(value.genre))
    const sales = Object.values(filteredData?.reduce((accumulator, currentValue) => {
      if (!accumulator[currentValue.location]) {
        accumulator[currentValue.location] = { location: currentValue.location, sales: 0 }
      }
      accumulator[currentValue.location].sales += currentValue.payment
      return accumulator
    }, {}))

    setDataLocationGenre({
      labels: sales?.map((item) => item.location),
      datasets: [
        {
          label: 'Sales',
          backgroundColor: 'rgba(253, 155, 42, 0.8)',
          borderColor: 'rgba(253, 155, 42, 1)',
          borderWidth: 1,
          data: sales?.map((item) => item.sales),
        },
      ],
    })
  }

  function submitFilterSales(value) {
    setSelectedMovie(value.movies)
    setUpDataMovie(value)
  }

  function submitFilterCategory(value) {
    setSelectedCategory(value.category)
    setSelectedLocation(value.location)
    setUpDataCategory(value)
  }

  function submitFilterTime(value) {
    setSelectedTimeMovie(value.movieTime)
    setSelectedTimePeriod(value.period)
    setUpDataTimeFiltered(value)
  }

  function submitFilterGenreLocation(value) {
    setSelectedGenreLocation(value.location)
    setSelectedGenre(value.genre)
    setUpDataLocationGenre(value)
  }

  const options = {
    responsive: true,
    plugins: {
        title: {
            display: true,
        }
    },
    scales: {
        y: {
            beginAtZero: true
        }
    }
  }

  if(currentLogin.profile.role !== 'admin') { return (<Navigate to='/' replace/>) } 
  if (error) return <div className='h-svh flex flex-col justify-center items-center'>{error}</div>

  return (
    <div>
        <NavbarAdmin currentlyOn='dashboard'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw bg-gray-200 h-fit py-10 px-10 flex flex-col gap-10 justify-starts items-center'>
            <div className='w-[80%] bg-white px-10 py-5 rounded-lg flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Sales Chart by Movie</span>
                <form onSubmit={handleSubmit(submitFilterSales)} id='sales' className='w-full flex flex-row gap-5'>
                    <select 
                      className='w-[25%] px-3 py-2 bg-gray-100 rounded-md'
                      {...register('movies')}
                      defaultValue='Movies Name'
                      >
                        <option disabled>Movies Name</option>
                        {movies?.map((item, index) => (
                            <option key={`movie-${index}`} value={item}>{item}</option>
                        ))}
                    </select>
                    <select name="duration-options" id="duration-options" className='w-[25%] px-3 py-2 bg-gray-100 rounded-md'>
                        <option>Daily</option>
                        <option>Weekly</option>
                        <option>Monthly</option>
                    </select>
                    <button type='submit' className='text-white font-semibold bg-orange-500 px-5 py-2 w-[20%] rounded-md'>Filter</button>
                </form>
                <div className='flex flex-col gap-2'>
                        <span className='font-bold text-2xl text-center'>{selectedMovie && selectedMovie}</span>
                        {dataMovie.labels &&
                            <Bar data={dataMovie} options={options}/>
                        }
                </div>
            </div>
            <div className='w-[80%] bg-white px-10 py-5 rounded-lg flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Sales per Cinema by Location</span>
                <form onSubmit={handleSubmit(submitFilterCategory)} id='ticket' className='w-full flex flex-row gap-5'>
                    <select 
                      {...register('location')}
                      className='w-[25%] px-3 py-2 bg-gray-100 rounded-md'
                      defaultValue='Location'
                      >
                        <option disabled>Location</option>
                        <option value={'Jakarta'}>Jakarta</option>
                        <option value={'Bekasi'}>Bekasi</option>
                        <option value={'Tangerang'}>Tangerang</option>
                        <option value={'Bogor'}>Bogor</option>
                        <option value={'Depok'}>Depok</option>
                    </select>
                    <button type='submit' className='text-white font-semibold bg-orange-500 px-5 py-2 w-[20%] rounded-md'>Filter</button>
                </form>
                <div className='flex flex-col gap-2'>
                        <span className='font-bold text-2xl text-center'>{selectedCategory && selectedCategory} {selectedLocation && selectedLocation}</span>
                        {dataCategory.labels &&
                            <Bar data={dataCategory} options={options}/>
                        }
                </div>
            </div>
            <div className='w-[80%] bg-white px-10 py-5 rounded-lg flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Sales by Movie and Time Period</span>
                <form onSubmit={handleSubmit(submitFilterTime)} id='time-filtered' className='w-full flex flex-row gap-5'>
                    <select 
                      {...register('movieTime')}
                      className='w-[25%] px-3 py-2 bg-gray-100 rounded-md'
                      defaultValue='Movies Name'
                      >
                        <option disabled>Movies Name</option>
                        {dummyMovies?.map((item, index) => (
                            <option key={`movie-time-${index}`} value={item}>{item}</option>
                        ))}
                    </select>
                    <select 
                      {...register('period')}
                      className='w-[25%] px-3 py-2 bg-gray-100 rounded-md'
                      defaultValue='Time Period'
                      >
                        <option disabled>Time Period</option>
                        <option value='Daily'>Daily</option>
                        <option value='Weekly'>Weekly</option>
                        <option value='Monthly'>Monthly</option>
                    </select>
                    <button type='submit' className='text-white font-semibold bg-orange-500 px-5 py-2 w-[20%] rounded-md'>Filter</button>
                </form>
                <div className='flex flex-col gap-2'>
                        <span className='font-bold text-2xl text-center'>{selectedTimeMovie && `${selectedTimeMovie} - ${selectedTimePeriod}`}</span>
                        {dataTimeFiltered.labels &&
                            <Bar data={dataTimeFiltered} options={options}/>
                        }
                </div>
            </div>
            <div className='w-[80%] bg-white px-10 py-5 rounded-lg flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Sales by Location and Genre</span>
                <form onSubmit={handleSubmit(submitFilterGenreLocation)} id='genre-location' className='w-full flex flex-row gap-5'>
                    <select 
                      {...register('location')}
                      className='w-[25%] px-3 py-2 bg-gray-100 rounded-md'
                      defaultValue='Location'
                      >
                        <option disabled>Location</option>
                        <option value='Jakarta'>Jakarta</option>
                        <option value='Bekasi'>Bekasi</option>
                        <option value='Tangerang'>Tangerang</option>
                        <option value='Bogor'>Bogor</option>
                        <option value='Depok'>Depok</option>
                    </select>
                    <select 
                      {...register('genre')}
                      className='w-[25%] px-3 py-2 bg-gray-100 rounded-md'
                      defaultValue='Genre'
                      >
                        <option disabled>Genre</option>
                        {dummyGenres?.map((item, index) => (
                            <option key={`genre-${index}`} value={item}>{item}</option>
                        ))}
                    </select>
                    <button type='submit' className='text-white font-semibold bg-orange-500 px-5 py-2 w-[20%] rounded-md'>Filter</button>
                </form>
                <div className='flex flex-col gap-2'>
                    <span className='font-bold text-2xl text-center'>{selectedGenre && selectedGenreLocation && `${selectedGenre} in ${selectedGenreLocation}`}</span>
                    {dataLocationGenre.labels &&
                        <Bar data={dataLocationGenre} options={options}/>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage