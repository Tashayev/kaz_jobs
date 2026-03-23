"use client"

import Hero from "./_components/Hero"
import Stats from "./_components/Stars"
import Categories from "./_components/Categories"
import FeaturedJobs from "../../features/jobs/components/FeaturedJobs"
import HowItWorks from "./_components/HowItWorks"
import Banner from "./_components/Banner"

const Home = () => {
 
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Categories />
      <FeaturedJobs />
      <HowItWorks />
      <Banner />
    </div>
  )
}

export default Home
