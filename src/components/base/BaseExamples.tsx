import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { IconButton, Paper } from '@mui/material'
import { useEffect, useState } from 'react'

interface BaseExamplesProps {
  examples: string[]
  delay?: number
}

function BaseExamples({ examples, delay = 10000 }: BaseExamplesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const switchToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % examples.length)
  }

  const switchToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? examples.length - 1 : prevIndex - 1,
    )
  }

  useEffect(() => {
    const intervalId = setInterval(switchToNext, delay)

    return () => clearInterval(intervalId)
  }, [currentIndex, delay, examples.length])

  return (
    <div className="flex flex-col h-full items-center space-y-4 text-lg">
      <Paper elevation={3} className="p-4 text-center">
        <div className="flex justify-center">
          <IconButton onClick={switchToPrev} aria-label="previous">
            <ArrowBackIcon />
          </IconButton>
          <span className="ml-2 mr-2">{examples[currentIndex]}</span>
          <IconButton onClick={switchToNext} aria-label="next">
            <ArrowForwardIcon />
          </IconButton>
        </div>
        <div className="flex justify-center mt-5">
          <div className="flex items-center space-x-4">
            {examples.map((_, index) => (
              <span
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`cursor-pointer mx-1 ${
                  index === currentIndex ? 'text-blue-500' : 'text-black'
                }`}
              >
                •
              </span>
            ))}
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default BaseExamples
