"use client"

import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { User } from 'next-auth'
import { Button } from './ui/button'
import RotatingText from '@/utils/rotatingText'

export default function Navbar() {

    const { data: session } = useSession()
    const user: User = session?.user as User
    const name = user?.userName && user?.userName?.charAt(0).toLocaleUpperCase() + user?.userName?.slice(1, user?.userName.length)
    return (

        <nav className='p-4 md:p-6 shadow-md'>
            <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
                {/* <a className='text-xl font-bold mb-4 md:mb-0 ' href="/">Veil Voice</a> */}
                <RotatingText />
                {session ? (<>
                    <span className='mr-4'>

                        Welcome, {name || user?.email} !
                    </span>
                    <Button className='w-full md:w-auto bg-customPurple hover:bg-purple-400' onClick={() => signOut({ callbackUrl: '/' })}>Logout</Button>
                </>) : (<>
                    <Link href={'/sign-in'}>
                        <Button className='w-full md:w-auto bg-customPurple hover:bg-purple-400'>Login</Button>
                    </Link>
                </>)}
            </div>
        </nav>
    )
}
