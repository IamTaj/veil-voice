"use client"
import { ACCEPT_MESSAGES_SERVICE, GET_MESSAGES_SERVICE } from '@/app/api/apiConstant'
import MessageCard from '@/components/messageCard'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { useToast } from '@/components/ui/use-toast'
import { AcceptMessageSchema } from '@/schemas/acceptMessageSchema'
import { ApiResponse } from '@/types/ApiResponseTypes'
import { Message, User } from '@/types/ModelsTypes'
import { zodResolver } from '@hookform/resolvers/zod'
import axios, { AxiosError } from 'axios'
import { Loader2, RefreshCcw } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useCallback, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

export default function Dashboard() {
    const [messages, setMessages] = useState<Message[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isSwitchLoading, setIsSwitchLoading] = useState<boolean>(false)

    const { toast } = useToast()

    const handleDeleteMessage = (messageId: string) => {
        setMessages(messages.filter((message) => message?._id !== messageId))
    }

    const { data: session } = useSession()
    const form = useForm({
        resolver: zodResolver(AcceptMessageSchema)
    })

    const { register, watch, setValue } = form

    const acceptMessage = watch('acceptMessages')

    const fetchAcceptMessage = useCallback(async () => {
        setIsSwitchLoading(true)

        try {
            const response = await axios.get<ApiResponse>(ACCEPT_MESSAGES_SERVICE)
            setValue('acceptMessages', response.data.isAcceptingMessage)


        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title: "Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant: "destructive"
            })
        }
        finally {
            setIsSwitchLoading(false)
        }

    }, [setValue, toast])

    const fetchMessages = useCallback(async (refresh: boolean = false) => {
        setIsLoading(true)
        setIsSwitchLoading(false)
        try {
            const response = await axios.get<ApiResponse>(GET_MESSAGES_SERVICE)
            setMessages(response.data.messages || [])
            if (refresh) {
                toast({
                    title: "Refresh Messages",
                    description: "Showing latest messages"
                })
            }
        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title: "Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant: "destructive"
            })
        }
        finally {
            setIsLoading(false)
            setIsSwitchLoading(false)
        }


    }, [toast])

    useEffect(() => {
        if (!session || !session?.user) return
        fetchMessages()
        fetchAcceptMessage()
    }, [session, setValue, fetchAcceptMessage, fetchMessages])

    const handleSwitchChange = async () => {
        try {
            const response = await axios.post<ApiResponse>(ACCEPT_MESSAGES_SERVICE, {
                acceptMessage: !acceptMessage
            })
            setValue('acceptMessages', !acceptMessage)
            toast({
                title: response.data.message,
                variant: 'default'
            })

        } catch (error) {
            const axiosError = error as AxiosError<ApiResponse>
            toast({
                title: "Error",
                description: axiosError.response?.data.message || "Failed to fetch message settings",
                variant: "destructive"
            })
        }
    }

    if (!session || !session.user) {
        return <div>Please Login</div>
    }

    const { userName } = session.user as User

    const baseUrl = `${window.location.protocol}//${window.location.host}`
    const profileUrl = `${baseUrl}/u/${userName}`

    const copyToClipboard = () => {
        navigator.clipboard.writeText(profileUrl)
        toast({
            title: "URL Copied",
            description: "Profile URL has been copied successfully"
        })
    }

    return (
        <div className='my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl'>
            <h1 className='text-4xl font-bold mb-4'>User Dashboard</h1>
            <div className='mb-4'>
                <h2 className='text-lg font-semibold mb-2'>Copy Unique Link</h2>
                <div className='flex items-center'>
                    <input
                        type="text"
                        value={profileUrl}
                        disabled
                        className='input input-bordered w-full p-2 mr-2'
                    />
                    <Button onClick={copyToClipboard}>Copy</Button>
                </div>
            </div>
            <div className='mb-4'>
                <Switch
                    {...register('acceptMessages')}
                    checked={acceptMessage}
                    onCheckedChange={handleSwitchChange}
                    disabled={isSwitchLoading}
                />
                <span className='ml-2'>
                    Accepting Messages: {acceptMessage ? "On" : "Off"}
                </span>
            </div>
            <Separator />
            <Button
                className='mt-4'
                variant={'outline'}
                onClick={(e) => {
                    e.preventDefault()
                    fetchMessages(true)
                }}
            >
                {isLoading ?
                    (<Loader2 className='h-4 w-4 animate-spin' />) : (
                        <RefreshCcw className='h-4 w-4' />
                    )}
            </Button>
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                {messages.length > 0 ? (
                    messages.map((message: Message, index: number) => (
                        <MessageCard
                            key={message?._id}
                            message={message}
                            onMessageDelete={handleDeleteMessage}
                        />
                    ))
                ) : (
                    <p>No messages to display.</p>
                )}
            </div>
        </div>
    )
}
