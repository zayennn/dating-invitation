import React from 'react'
import './GifDisplay.css'

const GifDisplay = ({ src, alt }) => {
  return (
    <div className="gif-display">
      <img 
        src={src} 
        alt={alt} 
        className="gif-display__image"
        loading="lazy"
      />
    </div>
  )
}

export default GifDisplay