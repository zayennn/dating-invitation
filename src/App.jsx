import React, { useState } from 'react'
import FloatingHearts from './components/FloatingHearts'
import WelcomePage from './pages/WelcomePage'
import SuccessPage from './pages/SuccessPage'
import DatePage from './pages/DatePage'
import ActivityPage from './pages/ActivityPage'
import SummaryPage from './pages/SummaryPage'
import './App.css'

function App() {
  const [currentStep, setCurrentStep] = useState(0)
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedActivities, setSelectedActivities] = useState([])

  const activities = [
    { id: "movie", title: "Watch a Movie", description: "Cozy movie night together" },
    { id: "cafe", title: "Go Café Hopping", description: "Discover cute cafés" },
    { id: "walk", title: "Take a Little Walk", description: "Peaceful stroll together" },
    { id: "dinner", title: "Have a Nice Dinner", description: "Romantic dinner date" },
    { id: "games", title: "Play Some Games", description: "Fun game session" },
    { id: "explore", title: "Explore Somewhere New", description: "New adventure awaits" },
  ]

  const toggleActivity = (activityId) => {
    setSelectedActivities(prev => 
      prev.includes(activityId)
        ? prev.filter(id => id !== activityId)
        : [...prev, activityId]
    )
  }

  const renderPage = () => {
    switch(currentStep) {
      case 0:
        return <WelcomePage onYes={() => setCurrentStep(1)} />
      case 1:
        return <SuccessPage onContinue={() => setCurrentStep(2)} />
      case 2:
        return (
          <DatePage 
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            onContinue={() => setCurrentStep(3)}
          />
        )
      case 3:
        return (
          <ActivityPage 
            activities={activities}
            selectedActivities={selectedActivities}
            onActivityToggle={toggleActivity}
            onContinue={() => setCurrentStep(4)}
          />
        )
      case 4:
        return (
          <SummaryPage 
            selectedDate={selectedDate}
            selectedActivities={selectedActivities}
            activities={activities}
          />
        )
      default:
        return <WelcomePage onYes={() => setCurrentStep(1)} />
    }
  }

  return (
    <div className="app">
      <FloatingHearts />
      <div className="app-content">
        {renderPage()}
      </div>
    </div>
  )
}

export default App