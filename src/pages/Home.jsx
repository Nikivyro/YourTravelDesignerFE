import React from 'react'
import MainLayout from '../Layout/MainLayout'
import AllExperiences from '../components/AllExperiences'
import Hero from '../components/Hero/Hero'

export default function Home() {
  return (
    <MainLayout>
        <Hero></Hero>
        <AllExperiences/>
    </MainLayout>
  )
}
