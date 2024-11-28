import AuthService from "@/services/AuthService"
import useSWRMutation from "swr/mutation"
import { object } from "zod"

export const useLogin = () => {
  const {trigger, data, isMutating, } = useSWRMutation(["login"], (url, {arg}: {arg: object}) => AuthService.login(arg))

  return {
    loginTrigger: trigger,
    loginData: data,
    loginMutating: isMutating
  }
}