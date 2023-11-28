import React, { useEffect, useRef, useState } from 'react'
import { Button } from '@mui/material'
import { getStatus } from '../api/SpreadsheetService'
import { ToastContainer } from 'react-toastify'
import BaseButton from './base/BaseButton'
import GoogleIcon from './base/GoogleIcon'
import SheetsCreation from './SheetsCreation'
import DocsCreation from './DocsCreation'

function Home() {
  const startRef = useRef<HTMLButtonElement | null>(null)
  useEffect(() => {
    if (startRef.current) {
      startRef.current.focus()
    }
  }, []) // Empty dependency array ensures that this effect runs only once, when the component is mounted

  const [loading, setLoading] = useState(false)
  const [assistedMode, setAssistedMode] = useState(false)

  const [showComponents, setShowComponents] = useState({
    docs: false,
    sheets: false,
    slides: false,
    sheetsAdvices: false,
  })

  const toggleDocsVisibility = () => {
    setShowComponents({
      docs: true,
      sheets: false,
      slides: false,
      sheetsAdvices: false,
    })
  }

  const toggleSheetsAdvicesVisibility = () => {
    setShowComponents({
      docs: false,
      sheets: false,
      slides: false,
      sheetsAdvices: true,
    })
  }

  const toggleSheetsVisibility = () => {
    setShowComponents({
      docs: false,
      sheets: true,
      slides: false,
      sheetsAdvices: true,
    })
  }

  const toggleSlidesVisibility = () => {
    setShowComponents({
      docs: false,
      sheets: false,
      slides: true,
      sheetsAdvices: false,
    })
  }
  const promptRef = useRef<HTMLTextAreaElement | null>(null)
  const enableAssistedMode = () => {
    setAssistedMode(true)
    toggleSheetsVisibility()
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }

  const disableAssistedMode = () => {
    setAssistedMode(false)
    toggleSheetsVisibility()
    if (promptRef.current) {
      promptRef.current.focus()
    }
  }

  const checkStatusOpenApi = () => {
    void (async () => {
      setLoading(true)
      await getStatus()
      setLoading(false)
    })()
  }

  return (
    <div className="Home">
      <header className="flex flex-col bg-slate-900 text-slate-50">
        <Button ref={startRef} autoFocus={true} />
        <div className="flex items-center h-1/3 justify-center pb-8 space-x-2">
          <GoogleIcon
            type="sheets"
            onClick={toggleSheetsAdvicesVisibility}
            focus={showComponents.sheetsAdvices}
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
        {showComponents.sheetsAdvices && (
          <div className="flex flex-col h-screen text-3xl items-center justify-center">
            <span className=" pb-16">
              Savez-vous précisement ce que doit contenir votre fichier ?
            </span>
            <div className="flex space-x-5 w-3/4">
              <div className="flex flex-col items-center justify-center space-y-5 self-start">
                <BaseButton
                  label="Oui j'ai une bonne idée des tableaux, lignes et colonnes que je souhaite générer"
                  onClick={disableAssistedMode}
                />
                <span className="text-lg text-center w-3/4 italic">
                  &ldquo;Je veux une feuille avec des tableau par différent taux
                  de TVA. Les taux de TVAs sont 20%, 2,1%, 5,5% et 10%. Je veux
                  également une feuille avec un tableau récapitulatif. Chaque
                  tableau devra contenir la valeur des stocks avec en ligne le
                  mois et en colonne l'année et ce pour une entière année
                  civile.&rdquo;
                </span>
              </div>
              <div className="flex flex-col items-center justify-center space-y-5  self-start">
                <BaseButton
                  label="Non je préfère laisser la main et juste partir d'une idée générale"
                  onClick={enableAssistedMode}
                />
                <span className="text-lg text-center w-3/4 italic">
                  &ldquo;Je suis un DPO et je veux envoyer un fichier à la CNIL
                  dans le cadre de la conformité au RGPD.&rdquo;
                </span>
              </div>
            </div>
          </div>
        )}
        <div className="flex h-screen w-screen items-center justify-center">
          <div>
            <ToastContainer
              position="top-right"
              hideProgressBar={false}
              newestOnTop={false}
              autoClose={false}
              closeOnClick
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </div>
          <div>
            {showComponents.sheets && (
              <SheetsCreation assistedMode={assistedMode} />
            )}
            {showComponents.docs && <DocsCreation />}
            {showComponents.slides && <span>TODO</span>}
          </div>
        </div>
        <div className="p-5">
          <BaseButton
            onClick={checkStatusOpenApi}
            label="Status"
            loading={loading}
          />
        </div>
      </header>
    </div>
  )
}

export default Home
