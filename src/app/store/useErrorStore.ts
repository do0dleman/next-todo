import { create } from 'zustand'

type ErrorState = {
    error: string,
    setError: (error: string | undefined) => void
}

const useErrorStore = create<ErrorState>((set) => ({
    error: "",
    setError: (error: string | undefined) => {
        console.log(error)
        if (error === undefined) error = "Something went wrong..."
        set(() => ({ error: error }))
    },
}))

export default useErrorStore