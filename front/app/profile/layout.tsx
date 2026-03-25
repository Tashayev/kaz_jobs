import Sidebar from "./_components/Sidebar"

const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-8 max-w-4xl">
        {children}
      </main>
    </div>
  )
}
 
export default ProfileLayout