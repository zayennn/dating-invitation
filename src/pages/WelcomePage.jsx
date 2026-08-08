import React, { useState, useEffect, useRef, useCallback } from 'react'
import PageWrapper from '../components/PageWrapper'
import PixelButton from '../components/PixelButton'
import PixelHeart from '../components/PixelHeart'
import GifDisplay from '../components/GifDisplay'
import { gifs } from '../assets'
import './WelcomePage.css'

const WelcomePage = ({ onYes }) => {
  const [noButtonPosition, setNoButtonPosition] = useState(null)
  const [buttonSize, setButtonSize] = useState({ width: 120, height: 45 })
  const noButtonRef = useRef(null)
  const noButtonInnerRef = useRef(null)
  const isMoving = useRef(false)
  const MARGIN = 15

  useEffect(() => {
    const updateButtonSize = () => {
      const el = noButtonInnerRef.current
      if (el) {
        const rect = el.getBoundingClientRect()
        setButtonSize({
          width: rect.width,
          height: rect.height
        })
      }
    }

    const timer = setTimeout(updateButtonSize, 50)
    window.addEventListener('resize', updateButtonSize)
    
    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', updateButtonSize)
    }
  }, [])

  const getRandomPosition = useCallback(() => {
    const vw = window.innerWidth
    const vh = window.innerHeight
    
    const maxX = Math.max(MARGIN, vw - buttonSize.width - MARGIN)
    const maxY = Math.max(MARGIN, vh - buttonSize.height - MARGIN)
    
    const minX = Math.min(MARGIN, maxX)
    const minY = Math.min(MARGIN, maxY)
    
    const randomX = minX + Math.random() * (maxX - minX)
    const randomY = minY + Math.random() * (maxY - minY)
    
    return { x: randomX, y: randomY }
  }, [buttonSize])

  const moveNoButton = useCallback(() => {
    if (isMoving.current) return
    
    isMoving.current = true
    
    const newPosition = getRandomPosition()
    
    const vw = window.innerWidth
    const vh = window.innerHeight
    const safeX = Math.max(MARGIN, Math.min(newPosition.x, vw - buttonSize.width - MARGIN))
    const safeY = Math.max(MARGIN, Math.min(newPosition.y, vh - buttonSize.height - MARGIN))
    
    setNoButtonPosition({ x: safeX, y: safeY })
    
    setTimeout(() => {
      isMoving.current = false
    }, 200)
  }, [getRandomPosition, buttonSize])

  useEffect(() => {
    const button = noButtonRef.current
    if (!button) return

    const handleMouseEnter = (e) => {
      e.preventDefault()
      moveNoButton()
    }

    const handleTouchStart = (e) => {
      e.preventDefault()
      moveNoButton()
    }

    const handleClick = (e) => {
      e.preventDefault()
      e.stopPropagation()
      moveNoButton()
    }

    button.addEventListener('mouseenter', handleMouseEnter)
    button.addEventListener('touchstart', handleTouchStart, { passive: false })
    button.addEventListener('click', handleClick)

    return () => {
      button.removeEventListener('mouseenter', handleMouseEnter)
      button.removeEventListener('touchstart', handleTouchStart)
      button.removeEventListener('click', handleClick)
    }
  }, [moveNoButton])

  return (
    <PageWrapper>
      <GifDisplay 
        src={gifs.hello}
        alt="Cute hello animation" 
      />
      
      <h1 className="welcome-heading">
        Would You Make a Little Memory With Me?
      </h1>
      
      <div className="welcome-buttons">
        <PixelButton onClick={onYes} variant="primary">
          YES <PixelHeart size={16} color="currentColor" />
</PixelButton>
        
        <div 
          ref={noButtonRef}
          className={`no-button-wrapper ${noButtonPosition ? 'no-button-wrapper--moved' : ''}`}
          style={noButtonPosition ? {
            position: 'fixed',
            left: `${noButtonPosition.x}px`,
            top: `${noButtonPosition.y}px`,
            transform: 'translate(0, 
          } : {}}
        >
          <span ref={noButtonInnerRef} className="no-button-inner">
            <PixelButton variant="secondary" className="no-button">
              NO
            </PixelButton>
          </span>
        </div>
      </div>
    </PageWrapper>
  )
}

export default WelcomePage