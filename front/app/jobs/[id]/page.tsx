import { useParams } from "next/navigation"

const JobDetailPage = () => {
  const { id } = useParams();
  
  return (
    <div>Job Detail Page</div>
  )
}

export default JobDetailPage