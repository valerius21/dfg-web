import React from 'react'
import Hero from '../components/layout/Hero'

const Home = () => {
  return (
    // <Hero customUID={process.env.CUSTOM_UID} />
    <Hero customUID={true} /> // TODO: remove this line
  )
}

export default Home
