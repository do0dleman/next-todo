"use client";

import { SignInButton, SignUpButton, useClerk, useUser } from "@clerk/nextjs"
import Link from "next/link";
import { useRouter } from "next/navigation"

function Header({ isMainPage = false }: { isMainPage?: boolean }) {

    const { isSignedIn } = useUser()
    const { signOut } = useClerk()

    const router = useRouter()

    let headerClasses = "py-4 px-8 mb-4 flex justify-between align-middle bg-indigo-600"
    if (isMainPage) headerClasses += "bg-transparent"

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