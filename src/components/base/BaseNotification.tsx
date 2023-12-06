import React from 'react'
import { ToastContainer } from 'react-toastify'

function BaseNotification() {
  return (
    <div className="BaseNotification">
      <div className="flex w-screen items-center justify-center">
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
      </div>
    </div>
  )
}

export default BaseNotification
