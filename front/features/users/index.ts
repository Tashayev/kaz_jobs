"use client"
import { useAppDispatch, useAppSelector } from "@/components/hooks/useReduxTypes"
import  { registerUser } from "./thunk/createUser"
import { useCallback, useEffect } from "react"
import { UserLoginTypes, UserRegisterTypes } from "./types"
import { logIn } from "./thunk/logIn"
import { getProfile } from "./thunk/getProfile"
import { userActions } from "./slice"


const useUser = () => {
  const dispatch = useAppDispatch()
  const { user, isLoading, isAuthenticated } = useAppSelector((state) => state.user)

  const handleRegister = useCallback(
    (data: UserRegisterTypes) => dispatch(registerUser(data)),
    [dispatch],
  )

  const handleLogIn = useCallback(
    (data: UserLoginTypes) => dispatch(logIn(data)),
    
    [dispatch],
  )

  const handleGetProfile = useCallback(
    async () => await dispatch(getProfile()),
    [dispatch],
  )

  return {
    user,
    isLoading,
    isAuthenticated,
    handleRegister,
    handleLogIn,
    handleGetProfile,
  }
}

export default useUser
