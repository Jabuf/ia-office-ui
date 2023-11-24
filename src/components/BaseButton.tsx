import React from 'react'
import '../styles/Home.css'
import { Button, Typography } from '@mui/material'
import { RotatingSquare } from 'react-loader-spinner'

interface BaseButtonProps {
  label: string
  onClick?: () => void
  href?: string
  loading?: boolean
  disabled?: boolean
}

function BaseButton({
  label,
  onClick,
  href,
  loading,
  disabled,
}: BaseButtonProps) {
  return (
    <div className="BaseButton">
      <Button
        onClick={onClick}
        href={href ?? ''}
        target="_blank"
        disabled={disabled}
        variant="contained"
        sx={{ 'background-color': 'rgb(14 116 144)' }}
      >
        {loading && (
          <RotatingSquare
            height="30"
            width="30"
            color="rgb(248 250 252)"
            strokeWidth="10"
            ariaLabel="progress-bar-loading"
            wrapperClass="pr-1"
          />
        )}
        <Typography variant="inherit" noWrap>
          {label}
        </Typography>
      </Button>
    </div>
  )
}

export default BaseButton
