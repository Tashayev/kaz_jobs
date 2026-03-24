"use client"

import Hero from "./_components/Hero"
import Stats from "./_components/Stars"
import Categories from "./_components/Categories"
import FeaturedJobs from "./_components/FeaturedJobs"
import HowItWorks from "./_components/HowItWorks"
import Banner from "./_components/Banner"
import { useJobs } from "@/features/jobs"


const Home = () => {
   const { isLoading, homeStage } = useJobs()
  
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Stats />
      <Categories />
      <FeaturedJobs isLoading={isLoading} homeStage={homeStage} />
      <HowItWorks />
      <Banner />
    </div>
  )
}

export default Home
