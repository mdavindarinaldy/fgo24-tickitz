import React, {useState, useEffect} from 'react'
import Navbar from '../components/Navbar'
import Subscription from '../components/Subscription'
import Footer from '../components/Footer'
import Button from '../components/Button'
import fetchNowPlayingMovies from '../script/fetchNowPlayingMovies';
import fetchUpcomingMovies from '../script/fetchUpcomingMovies';
import MovieCard from '../components/MovieCard';

import guaranted from '../assets/guaranted.png'
import customer from '../assets/customer.png'
import affordable from '../assets/affordable.png'

function HomePage() {
  const [movies, setMovies] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const getMovies = async () => {
      try {
        const data = await fetchNowPlayingMovies();
        const upcomingData = await fetchUpcomingMovies();
        setUpcomingMovies(upcomingData);
        setMovies(data?.slice(0,10));
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

  return (
    <div className='flex flex-col'>
        <Navbar currentlyOn='home'/>
        <div className='h-[12svh]'></div>
        <section id='hero' className='h-[30svh] w-[100svw] flex flex-col justify-center items-center gap-4 mb-[5svh]'>
            <span className='bg-orange-100 rounded-3xl text-orange-500 font-bold text-[3svw] md:text-[10px] w-fit py-1 px-3'>MOVIE TICKET PURCHASES #1 IN INDONESIA</span>
            <div className='flex flex-col gap-1 justify-center items-center'>
                <span className='text-[5svw] md:text-[3svw] lg:text-[2svw] font-bold'>Experience the Magic of Cinema:</span>
                <span className='text-[5svw] md:text-[3svw] lg:text-[2svw] font-extrabold text-orange-500'>Book Your Tickets Today</span>
            </div>
            <span className='text-[2svw] lg:text-[12px]'>Sign up and get the ticket with a lot of discount</span>
        </section>
        <section id='nowShowing' className='w-[100svw] h-fit bg-white flex flex-col justify-center items-center gap-5 pb-5 mb-5'>
          <div className='w-[90%] h-fit py-3 flex flex-row justify-between items-center'>
            <div className='w-[20%]'></div>
            <span className='text-[4svw] md:text-[3svw] lg:text-[2svw] font-bold'>Now Showing in Cinemas</span>
            <div className='w-[20%]'>
              <Button text="View All &rarr;" href="/movie" className="on"/>
            </div>
          </div>
          <div className='w-[100%] h-fit flex justify-center'>
            <div className='w-[90%] h-fit flex flex-row overflow-x-scroll gap-5'>
              {movies.map((movie) => (
                <MovieCard key={movie.id} id={movie.id} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} name={movie.title.toUpperCase()} genre={[`${movie.genre_ids[0]}`,`${movie.genre_ids[1]}`]} width=' w-[40svw] md:w-[25svw] lg:w-[20svw]' height='md:h-[30svw]' textSize="text-lg" buttonSize='text-[2svw] md:text-[1svw]' date='' details={true}/>
              ))}
            </div>
          </div>
        </section>
        <section id='benefit' className='w-[100svw] h-fit md:h-[60svh] bg-white'>
          <div className='w-[99svw] py-10 md:py-0 h-fit md:h-full bg-black rounded-2xl flex flex-col justify-center items-center'>
              <div className='flex flex-col md:flex-row w-full md:w-[80%] h-[60%] justify-between gap-5 md:gap-0'>
                <div className='flex flex-col justify-start items-center md:items-start w-full md:w-[40%] h-full gap-2 md:gap-0'>
                  <span className='bg-orange-100 rounded-3xl text-orange-500 font-bold text-[2svw] md:text-[10px] w-fit py-2 px-5'>WHY CHOOSE US</span>
                  <span className='font-bold text-[3svw] text-white'>Unleashing the Ultimate Movie Experience</span>
                </div>
                <div className='w-full md:w-[60%] h-full flex flex-col items-center md:flex-row gap-5 lg:gap-10'>
                  <div className='w-[50%] md:w-[32%] lg:w-[30%] h-full rounded-2xl bg-orange-100 flex flex-col justify-between py-5 px-5 box-border gap-5 md:gap-0'>
                    <div className='flex flex-col gap-2'>
                      <img src={affordable} className='size-[3svw]' alt="icon" />
                      <span className='font-bold text-base lg:text-lg'>Affordable</span>
                    </div>
                    <span className='font-light text-xs lg:text-sm'>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.</span>
                  </div>
                  <div className='w-[50%] md:w-[32%] lg:w-[30%] h-full rounded-2xl bg-orange-100 flex flex-col justify-between py-5 px-5 box-border gap-5 md:gap-0'>
                    <div className='flex flex-col gap-2'>
                      <img src={guaranted} className='size-[3svw]' alt="icon" />
                      <span className='font-bold text-base lg:text-lg'>Guaranted</span>
                    </div>
                    <span className='font-light text-xs lg:text-sm'>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.</span>
                  </div>
                  <div className='w-[50%] md:w-[32%] lg:w-[30%] h-full rounded-2xl bg-orange-100 flex flex-col justify-between py-5 px-5 box-border gap-5 md:gap-0'>
                    <div className='flex flex-col gap-2'>
                      <img src={customer} className='size-[3svw]' alt="icon" />
                      <span className='font-bold text-base lg:text-lg'>24/7 Customer Support</span>
                    </div>
                    <span className='font-light text-xs lg:text-sm'>Lorem ipsum dolor sit amet, consectetur adipis elit. Sit enim nec, proin faucibus nibh et sagittis a.</span>
                  </div>
                </div>
              </div>
          </div>
        </section>
        <section id='upcoming' className='w-[100svw] h-fit md:h-[60svh] bg-gray-100 flex flex-col-reverse md:flex-row justify-center items-center gap-5 pb-5 mb-5 mt-5 pt-5 md:pt-0'>
          <div className='flex flex-col justify-between w-2/3 h-[90%]'>
            <div className='flex flex-row overflow-x-scroll w-full h-fit gap-5'>
            {upcomingMovies.map((movie) => (
                <MovieCard key={movie.id} src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} name={movie.title.toUpperCase()} genre={[`${movie.genre_ids[0]}`,`${movie.genre_ids[1]}`]} width='w-[25svw] md:w-[10svw]' height='h-[35svw] md:h-[15svw]' textSize='text-sm' buttonSize='text-[0.75svw]' date={movie.release_date} details={false}/>
              ))}
            </div>
            <div></div>
          </div>
          <div className='flex flex-col justify-between w-3/4 h-[20svh] md:w-1/4 md:h-[90%]'>
            <div className='flex flex-col justify-start gap-2 md:gap-0'>
              <span className='bg-orange-100 rounded-3xl text-orange-500 font-bold text-[3svw] md:text-[10px] w-fit py-2 px-3'>UPCOMING MOVIES</span>
              <span className='text-[5svw] md:text-[3svw] font-bold'>Exciting Movie Coming Soon</span>
            </div>
            <div className='self-end'>
              <Button text="View All &rarr;" href="/movie" className="on"/>
            </div>
          </div>
        </section>
        <Subscription/>
        <Footer/>
    </div>
  )
}

export default HomePage