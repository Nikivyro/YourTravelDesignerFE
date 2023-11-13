import React from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

export default function MainLayout({children}) {
  return (
    <>
        <Navigation/>
        {children}
        <Footer/>
    </>
  )
}
