import React from 'react'
import PixelHeart from './PixelHeart'
import './ActivityCard.css'

const ActivityCard = ({ activity, isSelected, onToggle }) => {
  return (
    <div 
      className={`activity-card ${isSelected ? 'activity-card--selected' : ''}`}
      onClick={() => onToggle(activity.id)}
      role="checkbox"
      aria-checked={isSelected}
      tabIndex={0}
      onKeyPress={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onToggle(activity.id)
        }
      }}
    >
      <div className="activity-card__content">
        <div className="activity-card__checkbox">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={() => onToggle(activity.id)}
            className="activity-card__input"
            aria-label={`Select ${activity.title}`}
          />
          <div className="activity-card__custom-checkbox">
            {isSelected && <PixelHeart size={16} color="#ff8fba" />}
          </div>
        </div>
        <div className="activity-card__text">
          <h3 className="activity-card__title">{activity.title}</h3>
          <p className="activity-card__description">{activity.description}</p>
        </div>
        {isSelected && (
          <div className="activity-card__indicator">
            <PixelHeart size={12} color="#ff8fba" />
          </div>
        )}
      </div>
    </div>
  )
}

export default ActivityCard