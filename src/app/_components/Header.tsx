"use client";

import { SignInButton, SignOutButton, SignUpButton, useClerk, useUser } from "@clerk/nextjs"
import { useRouter } from "next/navigation"

function Header() {

    const { isSignedIn } = useUser()
    const { signOut } = useClerk()

    const router = useRouter()

    return (
        <header className="py-2 px-4 mb-4 flex justify-between align-middle bg-indigo-600">
            <h2 className="text-4xl">TODOs</h2>

            <div className="flex align-middle space-x-4">
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