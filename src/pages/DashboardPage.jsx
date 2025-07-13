import React, { useEffect, useState } from 'react'
import NavbarAdmin from '../components/NavbarAdmin'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { useForm } from 'react-hook-form'
import http from '../lib/http';

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
  const {register, handleSubmit} = useForm({})
  const [selectedMovie, setSelectedMovie] = useState('')
  const [error, setError] = useState(null)
  const [salesData, setSalesData] = useState([])
  const [chartData, setChartData] = useState({
    labels:[],
    datasets:[]
  })
  const [ticketData, setTicketData] = useState({
    labels:[],
    datasets:[]
  })

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await http(currentLogin.token).get('/admin/sales')
        setSalesData(response.data.results)
      } catch(err) {
        setError(err.message)
      }
    }
    getData()
  }, [currentLogin.token])

  useEffect(()=>{
    const filteredData = selectedMovie
      ? salesData.filter((movie)=> movie.title === selectedMovie)
      : salesData
    const chartConfig = {
      labels: filteredData.map((item) => item.title),
      datasets: [
        {
          label: 'Total Penjualan (IDR)',
          backgroundColor:'rgba(253,155,42,0.8)',
          borderColor:'rgba(253,155,42,1)',
          borderWidth: 1,
          data: filteredData.map((item)=>item.totalAmount)
        }
      ]
    }
    const ticketsChartConfig = {
      labels: filteredData.map((item) => item.title),
      datasets: [
        {
          label: 'Total Tiket Terjual',
          backgroundColor: 'rgba(253,155,42,0.8)',
          borderColor: 'rgba(253,155,42,1)',
          borderWidth: 1,
          data: filteredData.map((item) => item.ticketsSold),
        },
      ],
    }
    setChartData(chartConfig)
    setTicketData(ticketsChartConfig)
  }, [salesData, selectedMovie])

  const submitFilterSales = (data) => {
    setSelectedMovie(data.movies)
  }

  const options = {
    responsive: true,
    plugins: {
      title: {
          display: true,
          text: 'Grafik penjualan tiket bioskop',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Penjualan (IDR)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Judul Film',
        },
      },
    },
  }

  const ticketOptions = {
    responsive: true,
    plugins: {
      title: {
          display: true,
          text: 'Grafik penjualan tiket bioskop',
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Total Tiket Terjual (Pcs)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Judul Film',
        },
      },
    },
  }

  if(currentLogin.profile.role !== 'admin') { return (<Navigate to='/' replace/>) } 
  if (error) return <div className='h-svh flex flex-col justify-center items-center'>{error}</div>

  return (
    <div>
        <NavbarAdmin currentlyOn='dashboard'/>
        <div className='h-[10svh]'></div>
        <div className='w-svw bg-gray-200 h-fit py-10 px-10 flex flex-col gap-10 justify-starts items-center'>
            <div className='w-[80%] bg-white px-10 py-5 rounded-lg flex flex-col gap-5'>
                <span className='font-bold text-2xl'>Grafik Penjualan per Film</span>
                <form 
                  onSubmit={handleSubmit(submitFilterSales)} 
                  id='sales' className='w-full flex flex-row gap-5'>
                    <select
                      {...register('movies')}
                      className="w-[25%] px-3 py-2 bg-gray-100 rounded-md">
                    <option value="">Semua Film</option>
                    {salesData.map((movie) => (
                      <option key={movie.id_movie} value={movie.title}>{movie.title}</option>
                    ))}
                    </select>
                    <button
                      type="submit"
                      className="text-white font-semibold bg-orange-500 px-5 py-2 w-[20%] rounded-md"
                    >Filter</button>
                </form>
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-2xl text-center">
                      {selectedMovie || 'Semua Film'} - Total Penjualan
                    </span>
                    {chartData.labels.length > 0 && (
                      <Bar data={chartData} options={options} />
                    )}
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="font-bold text-2xl text-center">
                      {selectedMovie || 'Semua Film'} - Total Tiket Terjual
                    </span>
                    {ticketData.labels.length > 0 && (
                      <Bar data={ticketData} options={ticketOptions} />
                    )}
                  </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DashboardPage;