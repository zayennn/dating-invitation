import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import PixelButton from '../components/PixelButton'
import GifDisplay from '../components/GifDisplay'
import { gifs } from '../assets'
import './DatePage.css'

const DatePage = ({ selectedDate, onDateSelect, onContinue }) => {
  const [validationMessage, setValidationMessage] = useState('')

  const handleContinue = () => {
    if (!selectedDate) {
      setValidationMessage("Pick a day first, silly.")
      setTimeout(() => setValidationMessage(''), 3000)
      return
    }
    onContinue()
  }

  const handleDateChange = (e) => {
    onDateSelect(e.target.value)
    setValidationMessage('')
  }

return (
    <PageWrapper>
      <GifDisplay
        src={gifs.date}
        alt="Calendar animation" 
      />
      
      <h2 className="date-heading">
        When Should We Make It Happen?
      </h2>
      
      <p className="date-description">
        Choose a little day for our next adventure together.
      </p>
      
      <div className="date-input-container">
        <label htmlFor="date-picker" className="date-label">
          Pick our special day:
        </label>
        <input
          type="date"
          id="date-picker"
          className="date-input"
          value={selectedDate || ''}
          onChange={handleDateChange}
          min={new Date().toISOString().split('T')[0]}
          aria-label="Select date for our adventure"
        />
      </div>
      
      {validationMessage && (
        <p className="validation-message">
          {validationMessage}
        </p>
      )}
      
      <PixelButton 
        onClick={handleContinue}
        variant="primary"
      >
        Next Adventure →
      </PixelButton>
    </PageWrapper>
  )
}

export default DatePage