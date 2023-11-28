import React from 'react'

export type FileType = 'docs' | 'sheets' | 'slides'
interface GoogleIconProps {
  type: FileType
  onClick?: () => void
  focus?: boolean
}

function GoogleIcon({ type, onClick, focus }: GoogleIconProps) {
  return (
    <div
      className={[
        'GoogleIcon cursor-pointer',
        focus ? 'border-amber-50 border-2 rounded-3xl' : '',
      ].join(' ')}
      onClick={onClick}
    >
      {type === 'docs' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#2196f3"
            d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"
          ></path>
          <path fill="#bbdefb" d="M40 13L30 13 30 3z"></path>
          <path fill="#1565c0" d="M30 13L40 23 40 13z"></path>
          <path
            fill="#e3f2fd"
            d="M15 23H33V25H15zM15 27H33V29H15zM15 31H33V33H15zM15 35H25V37H15z"
          ></path>
        </svg>
      ) : type === 'sheets' ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#43a047"
            d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"
          ></path>
          <path fill="#c8e6c9" d="M40 13L30 13 30 3z"></path>
          <path fill="#2e7d32" d="M30 13L40 23 40 13z"></path>
          <path
            fill="#e8f5e9"
            d="M31,23H17h-2v2v2v2v2v2v2v2h18v-2v-2v-2v-2v-2v-2v-2H31z M17,25h4v2h-4V25z M17,29h4v2h-4V29z M17,33h4v2h-4V33z M31,35h-8v-2h8V35z M31,31h-8v-2h8V31z M31,27h-8v-2h8V27z"
          ></path>
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="100"
          height="100"
          viewBox="0 0 48 48"
        >
          <path
            fill="#ffc107"
            d="M37,45H11c-1.657,0-3-1.343-3-3V6c0-1.657,1.343-3,3-3h19l10,10v29C40,43.657,38.657,45,37,45z"
          ></path>
          <path fill="#ffecb3" d="M40 13L30 13 30 3z"></path>
          <path fill="#ffa000" d="M30 13L40 23 40 13z"></path>
          <path
            fill="#fff"
            d="M30,22H18c-1.1,0-2,0.9-2,2v12c0,1.1,0.9,2,2,2h12c1.1,0,2-0.9,2-2V24C32,22.9,31.1,22,30,22z M30,26v8H18v-8H30z"
          ></path>
        </svg>
      )}
    </div>
  )
}

export default GoogleIcon
