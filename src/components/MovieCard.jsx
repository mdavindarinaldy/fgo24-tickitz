import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import placeholder from '../assets/image-placeholder.png'

function MovieCard({id, src, width, height, name, genre, textSize, buttonSize, date, details, ...props}) {
  const genres=[]
  const [imageError,setImageError] = useState(false)

  function addGenre(item) {
    if (item === '28') genres.push('Action');
    if (item === '12') genres.push('Adventure');
    if (item === '16') genres.push('Animation');
    if (item === '35') genres.push('Comedy');
    if (item === '80') genres.push('Crime');
    if (item === '99') genres.push('Documentary');
    if (item === '18') genres.push('Drama');        
    if (item === '10751') genres.push('Family');
    if (item === '14') genres.push('Fantasy');      
    if (item === '36') genres.push('History');      
    if (item === '27') genres.push('Horror');
    if (item === '10402') genres.push('Music');     
    if (item === '9648') genres.push('Mystery');    
    if (item === '10749') genres.push('Romance');   
    if (item === '878') genres.push('Sci-Fi');
    if (item === '10770') genres.push('TV Movie');  
    if (item === '53') genres.push('Thriller');     
    if (item === '10752') genres.push('War');       
    if (item === '37') genres.push('Western');
  }
  genre.forEach((item) => addGenre(item))
  
  let anchor=''
  if(details===true) {anchor = `/buy-ticket/${id}`}
  else if (details===false) { anchor = '/'}

  return (
    <Link to={anchor}>
        <div className='flex flex-col justify-center items-center mb-10 gap-2' {...props}>
          <img 
            src={imageError ? placeholder : src} 
            alt="poster-movie" 
            className={`max-w-none rounded-3xl object-cover border-accents ${width} ${height} hover:border-10`}
            onError={()=>setImageError(true)}
          />
          <span className={`font-bold ${textSize} text-center`}>{name}</span>
          <div className='flex flex-row justify-center gap-5 max-w-svw lg:max-w-[20svw]'>
              {date === '' ? (
                  genres.map((item, index) => (
                      <div key={`movie-card-${index}`} className={`bg-gray-300 rounded-2xl py-1 px-5 font-normal ${buttonSize} text-gray-600 w-[50%] lg:w-fit`}>{item}</div>
                  ))
              ) : (
                  <div className={`bg-primary rounded-3xl text-orange-500 font-bold text-[10px] w-fit py-2 px-3`}>{date}</div>
              )}
          </div>
        </div>
    </Link>
  )
}

export default MovieCard