import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Card, CardActions, CardContent, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'

interface BaseExamplesProps {
  content: string[]
  delay?: number
}

function BaseCarousel({ content, delay = 10000 }: BaseExamplesProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const switchToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % content.length)
  }

  const switchToPrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1,
    )
  }

  useEffect(() => {
    const intervalId = setInterval(switchToNext, delay)

    return () => clearInterval(intervalId)
  }, [currentIndex, delay, content.length])

  return (
    <div className="flex-row min-w-full">
      <div className="flex justify-center pb-2">
        <span>exemple:</span>
      </div>
      <div className="flex text-base justify-center">
        <Card
          sx={{
            backgroundColor: 'rgb(30 41 59)',
            width: '35%',
            height: '200px',
          }}
        >
          <CardContent className="h-full">
            <div className="flex items-center min-h-full text-amber-50">
              {content.length > 1 && (
                <CardActions>
                  <IconButton onClick={switchToPrev} aria-label="previous">
                    <ArrowBackIcon className="text-slate-200" />
                  </IconButton>
                </CardActions>
              )}
              <span className="text-center text-slate-200 w-11/12 ml-2 mr-2">
                {`“${content[currentIndex]}”`}
              </span>
              {content.length > 1 && (
                <CardActions>
                  <IconButton onClick={switchToNext} aria-label="next">
                    <ArrowForwardIcon className="text-slate-200" />
                  </IconButton>
                </CardActions>
              )}
            </div>
            {/*{content.length > 1 && (*/}
            {/*  <div className="flex justify-center">*/}
            {/*    <div className="absolute bottom-0 flex items-center space-x-4 accent-slate-600">*/}
            {/*      {content.map((_, index) => (*/}
            {/*        <span*/}
            {/*          key={index}*/}
            {/*          onClick={() => setCurrentIndex(index)}*/}
            {/*          className={`cursor-pointer mx-1 ${*/}
            {/*            index === currentIndex ? 'text-blue-500' : 'text-black'*/}
            {/*          }`}*/}
            {/*        >*/}
            {/*          •*/}
            {/*        </span>*/}
            {/*      ))}*/}
            {/*    </div>*/}
            {/*  </div>*/}
            {/*)}*/}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BaseCarousel
