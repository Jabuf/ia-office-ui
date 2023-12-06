import React, { useEffect, useState } from 'react'
import DocsCreation from './DocsCreation'
import SheetsCreation from './SheetsCreation'
import SlidesCreation from './SlidesCreation'
import GoogleIcon from './base/GoogleIcon'
import BaseNotification from './base/BaseNotification'

function Home() {
  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0)
  }, []) // Empty dependency array ensures this effect runs only once, similar to componentDidMount

  const [showComponents, setShowComponents] = useState({
    docs: false,
    sheets: false,
    slides: false,
  })

  const toggleDocsVisibility = () => {
    setShowComponents({
      docs: true,
      sheets: false,
      slides: false,
    })
  }

  const toggleSheetsVisibility = () => {
    setShowComponents({
      docs: false,
      sheets: true,
      slides: false,
    })
  }

  const toggleSlidesVisibility = () => {
    setShowComponents({
      docs: false,
      sheets: false,
      slides: true,
    })
  }

  return (
    <div className="Home">
      <header className="flex flex-col w-screen h-screen bg-slate-900 text-slate-50">
        <span className="flex flex-col text-2xl items-center pb-16 pt-10">
          Choisissez le type de fichier que vous souhaitez générer
        </span>
        <div className="flex h-1/3 justify-center space-x-2 pb-16">
          <GoogleIcon
            type="sheets"
            onClick={toggleSheetsVisibility}
            focus={showComponents.sheets}
          />
          <GoogleIcon
            type="docs"
            onClick={toggleDocsVisibility}
            focus={showComponents.docs}
          />
          <GoogleIcon
            type="slides"
            onClick={toggleSlidesVisibility}
            focus={showComponents.slides}
          />
        </div>
        {showComponents.sheets && <SheetsCreation />}
        {showComponents.docs && <DocsCreation />}
        {showComponents.slides && <SlidesCreation />}
        <BaseNotification />
      </header>
    </div>
  )
}

export default Home
