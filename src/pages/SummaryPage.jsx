import React from 'react'
import PageWrapper from '../components/PageWrapper'
import PixelHeart from '../components/PixelHeart'
import GifDisplay from '../components/GifDisplay'
import { gifs } from '../assets'
import './SummaryPage.css'

const SummaryPage = ({ selectedDate, selectedActivities, activities }) => {
  const formatDate = (dateString) => {
    if (!dateString) return 'Not selected'
    
    const date = new Date(dateString)
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }
    
    return date.toLocaleDateString('en-US', options)
  }

  const selectedActivityTitles = activities
    .filter(activity => selectedActivities.includes(activity.id))
    .map(activity => activity.title)

return (
    <PageWrapper>
      <GifDisplay
        src={gifs.final}
        alt="Final celebration animation" 
      />
      
      <h2 className="summary-heading">
        It's Official, Then.
      </h2>
      
      <p className="summary-subtitle">
        Looks like we've got ourselves a little adventure.
      </p>
      
      <div className="summary-board">
        <div className="summary-board__title">
          OUR LITTLE PLAN
        </div>
        
        <div className="summary-board__content">
          <div className="summary-section">
            <div className="summary-label">DATE</div>
            <div className="summary-value">
              {formatDate(selectedDate)}
            </div>
          </div>
          
          <div className="summary-divider" />
          
          <div className="summary-section">
            <div className="summary-label">ACTIVITIES</div>
            <div className="summary-activities">
              {selectedActivityTitles.length > 0 ? (
                selectedActivityTitles.map((title, index) => (
                  <div key={index} className="summary-activity-item">
                    <PixelHeart size={12} color="#ff8fba" />
                    <span>{title}</span>
                  </div>
                ))
              ) : (
                <div className="summary-value">No activities selected</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  )
}

export default SummaryPage