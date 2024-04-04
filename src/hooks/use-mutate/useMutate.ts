import { toast } from "sonner"
import { UseMutate } from "./types"
import { mutator } from "./mutator"
import { useMutation } from "@tanstack/react-query"

export const useMutate: UseMutate = ({ 
  keys, url, auth=true, onError, onSuccess, method="POST", ...args 
}) => useMutation({
  mutationFn: async ({body, method:subMethod}) => 
    await mutator({url, method: subMethod || method, body, auth}),
  onError(error, ...args) {
    onError && onError(error, ...args)
    toast.error(error)
  },
  onSuccess(data, ...args) {
    onSuccess && onSuccess(data, ...args)
    toast.success(data.message)
  },
  mutationKey: keys,
  ...args
})