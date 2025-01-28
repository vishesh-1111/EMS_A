"use client"
import Image from 'next/image';
import { useState } from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import GlassIcon from '@mui/icons-material/LocalBar';
import Link from 'next/link'
import {CategorySharp,DescriptionTwoTone,Tag,TagFaces} from '@mui/icons-material'
const MovieDetail = () => {
  
  const movieData = {
    tags : 'Music,Pop',
    title: 'Emergency',
    duration: '2h 27m',
    genre: 'Drama, Historical',
    releaseDate: '17 Jan, 2025',
    description:'Emergency is based on true events that unfolded in 1975.  ',
    category : "Pop-Rock",
    poster: '/emergency_poster.jpg', // Replace with actual poster path
    background: '/i.jpg',
    extra : 'The film chronicles incidents that took place under the leadership of Mrs. Indira Gandhi, one of the most Powerful Women in Indian History.'
  };

  const [showMore, setShowMore] = useState(false);

  return (
    
    <div className="">
      
      <div className="relative">
      <div style={{ position: 'relative', width: '100%', height: '400px' }}>
  <Image
    src="https://picsum.photos/seed/picsum/1800/400"
    alt={movieData.title}
    layout="fill"
    objectFit="cover"
    className="opacity-70" // Slightly dim the background
  />
</div>

<div className="absolute inset-0 p-8 md:p-16 flex flex-col md:flex-row items-start md:items-center">
  <div className="md:w-1/3 mr-4 md:mr-4">  {/* Adjust the margin here */}
    <Image
      src='https://picsum.photos/seed/seed/400/500'
      alt={movieData.title}
      width={300}
      height={450}
      className="rounded-lg shadow-lg"
    />

  </div>
  <div className="md:w-2/3 text-white">
    <h1 className="text-4xl font-bold mb-4">{movieData.title}</h1>
    <div className="flex items-center mb-2">
      <span className="text-black mr-2">{movieData.rating}</span>
      <span className="text-black">({movieData.votes} Votes)</span>
    </div>
    <p className="mb-4 text-black">{movieData.language}</p>
    <p className="mb-4 text-black">
      <HourglassEmptyIcon />
      {movieData.duration} 
    </p>
    <p className='mb-4 text-black'> 
    <CalendarTodayIcon />
    {movieData.releaseDate} 
    </p>
    <p className='mb-4 text-black'> 
    <CategorySharp />
    {movieData.genre} 
    </p>
    {/* <button 
    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
    onClick={()=>{
      <Link href={'/'}>
      </Link>
    }}
    >
    
      Book tickets
    </button> */}
    <Link href={'/seatmap'}>
    <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded" 
    >
     Book tickets
    </button>
    </Link>
  </div>
</div>

      </div>

      <div className="bg-white p-8 md:p-16">
        <div >
          <Tag fontSize='48px'></Tag>
          {movieData.tags}
        </div>
        <h2 className="text-2xl font-bold mb-4">About the Event</h2>
        <p className="text-gray-700 leading-relaxed">
          <DescriptionTwoTone/>
          {!showMore ? movieData.description : movieData.description.slice(0, 200) + movieData.extra}
          <button onClick={() => setShowMore(!showMore)} className="text-blue-500 ml-1">
            {showMore ? 'Show less' : 'Show more'}
          </button>
        </p>
      </div>

   
    </div>
  );
};

export default MovieDetail;