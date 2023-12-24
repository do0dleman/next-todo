import { create } from 'zustand'

type TodoStore = {
    currentFolderId: number | undefined,
    setCurrentFolderId: (folderId: number) => void
}

const useTodoStore = create<TodoStore>((set) => ({
    currentFolderId: undefined,
    setCurrentFolderId: (folderId: number) => set(() => ({ currentFolderId: folderId })),
}))

export default useTodoStore