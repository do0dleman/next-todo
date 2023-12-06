"use client";

import { SignInButton, SignUpButton, useClerk, useUser } from "@clerk/nextjs"
import Link from "next/link";
import { useRouter } from "next/navigation"
import useScroll from "../hooks/useScroll";
import { useEffect, useState } from "react";

function Header({ isMainPage = false }: { isMainPage?: boolean }) {

    const { isSignedIn } = useUser()
    const { signOut } = useClerk()

    const router = useRouter()

    const scrollY = useScroll()
    const [isOnTop, setIsOnTop] = useState(true)

    let headerClasses = "py-4 px-8 mb-4 flex justify-between align-middle bg-violet-800 fixed w-full"
    if (isMainPage && isOnTop) headerClasses += " !bg-transparent"

    useEffect(() => {
        const height = 72 // height of the header

        if (scrollY > height) {
            setIsOnTop(false)
        }
        if (scrollY <= height) {
            setIsOnTop(true)
        }
    }, [scrollY])

    return (
        <header className={headerClasses}>
            <h2 className="text-4xl">
                <Link href="/">TODOs</Link>
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