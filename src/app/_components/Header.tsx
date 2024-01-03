"use client";

import { SignInButton, SignUpButton, useClerk, useUser } from "@clerk/nextjs"
import Link from "next/link";
import { useRouter } from "next/navigation"
import useScroll from "../hooks/useScroll";
import { useEffect, useState } from "react";
import { FaList as Icon } from "react-icons/fa";

function Header({ isMainPage = false }: { isMainPage?: boolean }) {

    const { isSignedIn } = useUser()
    const { signOut } = useClerk()

    const router = useRouter()

    const scrollY = useScroll()
    const [isOnTop, setIsOnTop] = useState(true)

    useEffect(() => {
        const HEADER_HEIGHT = 72

        if (scrollY > HEADER_HEIGHT) {
            setIsOnTop(false)
        }
        if (scrollY <= HEADER_HEIGHT) {
            setIsOnTop(true)
        }
    }, [scrollY])

    return (
        <header className={`py-4 px-8 mb-4 flex justify-between align-middle 
        bg-active fixed w-full transition-colors duration-300 z-50 
        ${isMainPage && isOnTop ? '!bg-transparent' : ''}
        ${isOnTop ? '' : 'shadow-2xl'}`}>
            <h2 className="text-4xl">
                <Link href="/" className="flex gap-2"><Icon />TODOs</Link>
            </h2>

            <div className="flex align-middle space-x-4 ">
                {!isSignedIn && (
                    <>
                        <SignInButton />
                        <SignUpButton />
                    </>
                )}
                {isSignedIn && (
                    <button onClick={() => signOut((() => router.push("/")))}>
                        Sign out
                    </button>
                )}
            </div>
        </header>
    )
}
export default Header