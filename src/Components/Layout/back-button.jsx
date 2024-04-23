import React from 'react'

export default function BackButton() {
    const buttonText = "<- Volver"
  return (
    <a className="absolute top-4 left-7 text-brand-1 text-2xl cursor-pointer underline decoration-2 hover:text-brand-2 z-10 font-inknut" href='/'>
        {buttonText}
    </a>
  )
}
