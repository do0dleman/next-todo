"use client"

import useErrorStore from "../hooks/useErrorStore"
import ErrorModal from "./ErrorModal"

function ErrorProvider({ children }: { children: React.ReactNode }) {

    const error = useErrorStore((state) => state.error)
    const setError = useErrorStore((state) => state.setError)

    return (
        <>
            <ErrorModal error={error} onClose={() => setError("")} />
            {children}
        </>
    )
}
export default ErrorProvider