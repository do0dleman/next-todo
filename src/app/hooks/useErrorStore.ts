import { create } from 'zustand'

type ErrorState = {
    error: string,
    setError: (error: string) => void
}

const useErrorStore = create<ErrorState>((set) => ({
    error: "",
    setError: (error: string) => set(() => ({ error: error })),
}))

export default useErrorStore