"use client"

import {
  Form,
  FormItem,
  FormField,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import Cookies from "js-cookie"
import { useMutate } from "@/hooks"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { zodResolver } from "@hookform/resolvers/zod"
 
const formSchema = z.object({
  email: z.string().email({
    message: "البريد الإلكتروني غير صحيح",
  }),
  password: z.string().regex(
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/,
    "كلمة المرور غير صحيحة"
  )
})
 
export const Login = () => {
  const { replace } = useRouter()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {email: "a@admin.com", password: "123@Ahmed"}
  })
  
  const { mutate, isPending } = useMutate<{token: string}>({
    auth: false,
    keys: ["login"],
    url: "admin/auth/login",
    onSuccess(data) {
      Cookies.set("token", data.data.token)
      replace("/")
    }
  })
  
  const onSubmit = (values: z.infer<typeof formSchema>) => mutate({body: values})

  return (
    <Form {...form}>
      <form 
        autoComplete="off"
        className="space-y-5" 
        onSubmit={form.handleSubmit(onSubmit)} 
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>البريد الإلكتروني</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>كلمة المرور</FormLabel>
              <FormControl>
                <Input type="password" {...field}  />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit" loading={isPending}>
          تسجيل دخول
        </Button>
      </form>
    </Form>
  )
}