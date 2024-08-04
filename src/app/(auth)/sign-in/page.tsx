"use client"
import React, { useEffect, useState } from 'react'
import * as z from 'zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { signInScehma } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const { toast } = useToast()
  const router = useRouter()

  //zod 
  const form = useForm({
    resolver: zodResolver(signInScehma),
    defaultValues: {
      identifier: "",
      password: "",
    }
  })

  const onSubmit = async (data: z.infer<typeof signInScehma>) => {
    setIsSubmitting(true)
    const response = await signIn('credentials', {
      redirect: false,
      identifier: data.identifier,
      password: data.password
    })
    if (response?.error) {

      toast({
        title: "Login Failed",
        description: `Incorrect username or password\n:${response?.error}`,
        variant: "destructive"
      })
    }

    if (response?.url) {
      router.replace('/dashboard')
    }
    setIsSubmitting(false)
  }

  return (
    <div className='flex-grow flex flex-col items-center px-4 md:px-24 py-12 justify-center item-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md'>
        <div className=' text-center'>
          <h1 className='text-4xl font-extrabold tracking-tight lg:text-5xl mb-6'>
            Veil Login
          </h1>
          <p className='mb-4'>
            Back for More? Jump In and Log On!
          </p>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-6'>
            <FormField
              name="identifier"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email / Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Email / Username" {...field} />
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
                    <Input type='password' placeholder="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type='submit' disabled={isSubmitting}
              className='w-full md:w-auto bg-customPurple hover:bg-purple-400'
            >
              {isSubmitting ? (
                <>
                  <Loader2 className='rm-2 h-4 w-4 animate-spin' />
                  {"Please wait"}
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <div className=' text-center mt-4'>
          <p>
            New to Veil Voice? Sign Up to Get Started
            <Link href={"/sign-up"} className=' text-customPurple hover:text-purple-300'> Join</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
