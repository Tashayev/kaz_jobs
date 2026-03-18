"use client"

import { useJobs } from "@/features/jobs"
import Hero from "./_components/Hero"
import Stats from "./_components/Stars"
import Categories from "./_components/Categories"
import FeaturedJobs from "./_components/FeaturedJobs"
import HowItWorks from "./_components/HowItWorks"
import Banner from "./_components/Banner"

const Home = () => {
  // const [jobs, setJobs] = useState<Job[]>([])

  // const [isLoading, setIsLoading] = useState(true)

  // useEffect(() => {
  //   const fetchJobs = async () => {
  //     try {
  //       const res = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}${Endpoints.JOBS}`,
  //       )
  //       const data = await res.json()
  //       setJobs(data.jobs?.slice(0, 6) ?? [])
  //     } catch {
  //       setJobs([])
  //     } finally {
  //       setIsLoading(false)
  //     }
  //   }
  //   fetchJobs()
  // }, [])

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
