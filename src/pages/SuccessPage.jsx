import React from 'react'
import PageWrapper from '../components/PageWrapper'
import PixelButton from '../components/PixelButton'
import GifDisplay from '../components/GifDisplay'
import { gifs } from '../assets'
import './SuccessPage.css'

const SuccessPage = ({ onContinue }) => {
return (
    <PageWrapper>
      <GifDisplay
        src={gifs.yes}
        alt="Happy celebration animation" 
      />
      
      <h1 className="success-heading">
        YAY! OUR LITTLE ADVENTURE IS ON!
      </h1>
      
      <p className="success-message">
        That just made my whole day a little sweeter.
      </p>
      
      <PixelButton onClick={onContinue} variant="primary">
        Let's Keep Going →
      </PixelButton>
    </PageWrapper>
  )
}

export default SuccessPage