import React, { useState } from 'react'
import PageWrapper from '../components/PageWrapper'
import PixelButton from '../components/PixelButton'
import GifDisplay from '../components/GifDisplay'
import ActivityCard from '../components/ActivityCard'
import { gifs } from '../assets'
import './ActivityPage.css'

const ActivityPage = ({ activities, selectedActivities, onActivityToggle, onContinue }) => {
  const [validationMessage, setValidationMessage] = useState('')

  const handleContinue = () => {
    if (selectedActivities.length === 0) {
      setValidationMessage("Choose at least one little adventure first.")
      setTimeout(() => setValidationMessage(''), 3000)
      return
    }
    onContinue()
  }

return (
    <PageWrapper>
      <GifDisplay
        src={gifs.activity}
        alt="Fun activities animation" 
      />
      
      <h2 className="activity-heading">
        What Kind of Little Adventure Should We Have?
      </h2>
      
      <p className="activity-description">
        Choose whatever sounds the most fun for us.
      </p>
      
      <div className="activities-grid">
        {activities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            isSelected={selectedActivities.includes(activity.id)}
            onToggle={onActivityToggle}
          />
        ))}
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
        Make It Official →
      </PixelButton>
    </PageWrapper>
  )
}

export default ActivityPage