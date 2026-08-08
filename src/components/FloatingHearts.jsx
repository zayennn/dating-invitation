import React, { useEffect, useState } from 'react'
import './FloatingHearts.css'

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    const createHeart = () => {
      const id = Date.now() + Math.random()
      const size = 15 + Math.random() * 25
      const startX = Math.random() * window.innerWidth
      const duration = 4 + Math.random() * 6
      const delay = Math.random() * 3
      const drift = -30 + Math.random() * 60
      
      const newHeart = {
        id,
        size,
        startX,
        duration,
        delay,
        drift,
        opacity: 0.3 + Math.random() * 0.4
      }
      
      setHearts(prev => [...prev, newHeart])
      
      setTimeout(() => {
        setHearts(prev => prev.filter(h => h.id !== id))
      }, (duration + delay) * 1000)
    }

    const interval = setInterval(createHeart, 500)
    
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="floating-hearts-container" aria-hidden="true">
      {hearts.map(heart => (
        <div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.startX}px`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
            '--drift': `${heart.drift}px`
          }}
        >
          <svg viewBox="0 0 32 32" fill="currentColor" className="heart-svg">
            <path d="M16 28 L16 28 L8 20 Q0 12 0 8 Q0 2 8 2 Q14 2 16 8 Q18 2 24 2 Q32 2 32 8 Q32 12 24 20 L16 28 Z" />
          </svg>
          <div className="heart-particles">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="heart-particle"
                style={{
                  '--particle-angle': `${i * 60}deg`,
                  '--particle-delay': `${0.1 * i}s`
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default FloatingHearts