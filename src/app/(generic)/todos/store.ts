import { create } from 'zustand'

type TodoStore = {
    currentFolderId: number | undefined,
    setCurrentFolderId: (folderId: number | undefined) => void
}

const useTodoStore = create<TodoStore>((set) => ({
    currentFolderId: undefined,
    setCurrentFolderId: (folderId: number | undefined) => set(() => ({ currentFolderId: folderId })),
}))

export default useTodoStore