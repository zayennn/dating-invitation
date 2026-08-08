import React from 'react'

const PixelHeart = ({ size = 24, color = '#ff8fba', className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 16 16" 
      fill={color}
      className={className}
      style={{ imageRendering: 'pixelated' }}
      aria-hidden="true"
    >
      <rect x="4" y="1" width="2" height="2" />
      <rect x="10" y="1" width="2" height="2" />
      <rect x="2" y="3" width="2" height="2" />
      <rect x="12" y="3" width="2" height="2" />
      <rect x="0" y="5" width="2" height="2" />
      <rect x="14" y="5" width="2" height="2" />
      <rect x="0" y="7" width="2" height="2" />
      <rect x="14" y="7" width="2" height="2" />
      <rect x="2" y="9" width="2" height="2" />
      <rect x="12" y="9" width="2" height="2" />
      <rect x="4" y="11" width="2" height="2" />
      <rect x="10" y="11" width="2" height="2" />
      <rect x="6" y="13" width="2" height="2" />
      <rect x="8" y="13" width="2" height="2" />
    </svg>
  )
}

export default PixelHeart