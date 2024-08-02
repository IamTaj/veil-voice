"use client"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { verifySchema } from "@/schemas/verfiySchema"
import { ApiResponse } from "@/types/ApiResponseTypes"
import { zodResolver } from "@hookform/resolvers/zod"
import axios, { AxiosError } from "axios"
import { useParams, useRouter } from "next/navigation"
import React from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

// Define the type for form data based on the zod schema
type VerifySchemaType = z.infer<typeof verifySchema>;

export default function VerifyAccount() {
    const router = useRouter()
    const params = useParams<{ username: string }>()
    const { toast } = useToast()

    // Use the defined type with useForm
    const form = useForm<VerifySchemaType>({
        resolver: zodResolver(verifySchema),
    })

    const onSubmit = async (data: VerifySchemaType) => {
        try {
            const response = await axios.post(`/api/verify-code`, {
                code: data.code,
                userName: params.username,
            })

            toast({
                title: "Success",
                description: response.data.message,
            })
            router.push("/sign-in")
        } catch (error) {
            console.log("Error in signup of user", error)
            const axiosError = error as AxiosError<ApiResponse>
            let errorMessage = axiosError.response?.data.message
            toast({
                title: "Signup Failed",
                description: errorMessage,
                variant: "destructive",
            })
        }
    }
    return (
        <div className="flex justify-center item-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className=" text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">
                        Verify Your Veil Account
                    </h1>
                    <p className="mb-4">Enter the verification code sent to your email</p>
                </div>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code" // Make sure this matches the schema
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Verification Code</FormLabel>
                                    <FormControl>
                                        <Input placeholder="OTP" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}
