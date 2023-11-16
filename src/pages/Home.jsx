import React from 'react'
import Layout from '../Layout/Layout'
import AllExperiences from '../components/Experiences/AllExperiences'
import Hero from '../components/Hero/Hero'
import CitiesHome from '../components/Cities/CitiesHome'

export default function Home() {
  return (
    <Layout>
        <Hero></Hero>
        <AllExperiences/>
        <CitiesHome/>       
    </Layout>
  )
}
