import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import placeholder from '../assets/image-placeholder.png'

function MovieCard({id, src, width, height, name, genre, textSize, buttonSize, date, details, ...props}) {
  const genres=genre
  const [imageError,setImageError] = useState(false)
  
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