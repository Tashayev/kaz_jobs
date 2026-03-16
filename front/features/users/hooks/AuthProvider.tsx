"use client"
import { useEffect } from "react"
import { localStore } from "../../../components/utils/localStore"
import { ACCESS_TOKEN } from "@/lib/baseApi"
import useUser from "@/features/users"

const AuthProvider = ({ children }: { children: React.ReactNode }) => {

  const { get } = localStore
  const token = get(ACCESS_TOKEN)
  const { handleGetProfile, user } = useUser()
console.log(token)
  useEffect(() => {
    if (token) handleGetProfile()
  }, [ token, handleGetProfile])
console.log(user)
  return <>{children}</>
}

export default AuthProvider
