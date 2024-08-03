"use client"
import React, { useEffect, useState } from 'react'
import * as z from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useDebounceCallback } from 'usehooks-ts'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { SignUpSchema } from '@/schemas/signUpSchema'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponseTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { CHECK_USERNAME_UNIQUE_SERVICE, SIGNUP_SERVICE } from '@/app/api/apiConstant'

const Page = () => {
  const [userName, setUserName] = useState<string>('')
  const [userNameMessage, setUserNameMessage] = useState<string>('')
  const [isCheckingUserName, setIsCheckingUserName] = useState<boolean>(false)
  const [isSumbitting, setIsSumbitting] = useState<boolean>(false)

  const debounced = useDebounceCallback(setUserName, 300)
  const { toast } = useToast()
  const router = useRouter()

  //zod 
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      userName: "",
      email: "",
      password: "",
      fullName: ""
    }
  })

  useEffect(() => {
    const checkUserName = async () => {
      if (userName) {
        setIsCheckingUserName(true)
        try {
          const response = await axios.get(`${CHECK_USERNAME_UNIQUE_SERVICE}?username=${userName}`)
          setUserNameMessage(response.data.message)
        } catch (error) {
          const axiosError = error as AxiosError<ApiResponse>
          setUserNameMessage(axiosError.response?.data?.message ?? "Error checking username")
        }
        finally {
          setIsCheckingUserName(false)
        }
      }
    }
    checkUserName()
  }, [userName])

  const onSubmit = async (data: z.infer<typeof SignUpSchema>) => {
    setIsSumbitting(true)
    try {
      const response = await axios.post(SIGNUP_SERVICE, data)
      toast({
        title: "Success",
        description: response.data.message
      })
      router.replace(`/verify/${userName}`)
      setIsSumbitting(false)
    } catch (error) {
      console.log('Error in signup of user', error)
      const axiosError = error as AxiosError<ApiResponse>
      let errorMessage = axiosError.response?.data.message
      toast({
        title: "Signup Failed",
        description: errorMessage,
        variant: "destructive"
      })
      setIsSumbitting(false)
    }
  }

  return (
    <div className='flex justify-center item-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className=' text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
            Join Veil Voice

          </h1>
          <p className='mb-4'>
            Sign up to start your anonymous adventure
          </p>

        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              name="userName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="username" {...field}
                      onChange={(e: any) => {
                        field.onChange(e)
                        debounced(e.target.value)
                      }}
                    />
                  </FormControl>
                  {isCheckingUserName && <Loader2 className='animate-spin' />}
                  <p className={`text-sm ${userNameMessage === "Username is unique" ? 'text-green-500' : 'text-red-500'}`}>test {userNameMessage}</p>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="email"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field}
                      onChange={(e: any) => {
                        field.onChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="password"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type='password' placeholder="password" {...field}
                      onChange={(e: any) => {
                        field.onChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              name="fullName"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Fullname</FormLabel>
                  <FormControl>
                    <Input placeholder="fullname" {...field}
                      onChange={(e: any) => {
                        field.onChange(e.target.value)
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isSumbitting}>
              {isSumbitting ? (
                <>
                  <Loader2 className='rm-2 h-4 w-4 animate-spin' />
                  {"Please wait"}
                </>

              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <div className=' text-center mt-4'>
          <p>
            Already a member?
            <Link href={"/sign-in"} className=' text-blue-600 hover:text-blue-800'>Sign in</Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Page

