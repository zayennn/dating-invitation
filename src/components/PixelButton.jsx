import React from 'react'
import './PixelButton.css'

const PixelButton = ({ children, onClick, disabled, variant = 'primary', ariaLabel, className = '' }) => {
  return (
    <button
      className={`pixel-button pixel-button--${variant} ${disabled ? 'pixel-button--disabled' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || children}
    >
      <span className="pixel-button__content">
        {children}
      </span>
    </button>
  )
}

export default PixelButton