import AuthService from "@/services/AuthService"
import { mutate } from "swr"
import useSWRMutation from "swr/mutation"

export const useRegistration = () => {
  const { trigger: registrationTrigger } = useSWRMutation(["/registration"], (url, { arg }: {arg: object}) => 
    console.log("@"), {
      onSuccess: () => {
        mutate(() => true)
      }
    }
  )
  return {
    registrationTrigger
  }
}